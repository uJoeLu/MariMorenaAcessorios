<template>
  <div class="meus-pedidos">
    <h2>Meus Pedidos</h2>

    <!-- Filtros e Busca -->
    <div class="filters">
      <div class="filter-group">
        <label for="status-filter">Filtrar por Status:</label>
        <select id="status-filter" v-model="statusFilter" @change="filtrarPedidos">
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="processando">Processando</option>
          <option value="enviado">Enviado</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      <div class="search-group">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar por número do pedido ou produto..."
          @input="filtrarPedidos"
        />
      </div>
    </div>

    <!-- Tabela de Pedidos -->
    <div v-if="pedidosFiltrados.length > 0" class="pedidos-table">
      <table>
        <thead>
          <tr>
            <th>Número do Pedido</th>
            <th>Produto</th>
            <th>Status</th>
            <th>Itens</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidosFiltrados" :key="pedido.id">
            <td>{{ pedido.numeroPedido || pedido.id }}</td>
            <td>
              <div class="produto-info">
                <img
                  v-if="pedido.itens && pedido.itens[0] && pedido.itens[0].produto && pedido.itens[0].produto.imagem"
                  :src="pedido.itens[0].produto.imagem"
                  :alt="pedido.itens[0].produto.nome"
                  class="produto-imagem"
                />
                <span>{{ pedido.itens && pedido.itens[0] ? pedido.itens[0].produto.nome : 'Produto' }}</span>
              </div>
            </td>
            <td>
              <span :class="`status status-${pedido.status}`">{{ getStatusLabel(pedido.status) }}</span>
            </td>
            <td>{{ pedido.itens ? pedido.itens.length : 0 }}</td>
            <td>
              <button @click="verDetalhes(pedido)" class="btn-detalhes">Ver Detalhes</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Estado Vazio -->
    <div v-else-if="!loading" class="empty-state">
      <p>{{ pedidos.length === 0 ? 'Você ainda não fez nenhum pedido.' : 'Nenhum pedido encontrado com os filtros aplicados.' }}</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">Carregando pedidos...</div>

    <!-- Modal de Detalhes -->
    <div v-if="pedidoSelecionado" class="modal-overlay" @click="fecharModal">
      <div class="modal-content" @click.stop>
        <h3>Detalhes do Pedido #{{ pedidoSelecionado.numeroPedido || pedidoSelecionado.id }}</h3>
        <div class="pedido-detalhes">
          <div class="detalhe-item">
            <strong>Status:</strong> <span :class="`status status-${pedidoSelecionado.status}`">{{ getStatusLabel(pedidoSelecionado.status) }}</span>
          </div>
          <div class="detalhe-item">
            <strong>Data:</strong> {{ formatarData(pedidoSelecionado.dataCriacao) }}
          </div>
          <div class="detalhe-item">
            <strong>Total:</strong> R$ {{ pedidoSelecionado.total ? pedidoSelecionado.total.toFixed(2) : '0.00' }}
          </div>
          <div class="detalhe-item">
            <strong>Itens:</strong>
            <ul class="itens-lista">
              <li v-for="item in pedidoSelecionado.itens" :key="item.id">
                <img
                  v-if="item.produto && item.produto.imagem"
                  :src="item.produto.imagem"
                  :alt="item.produto.nome"
                  class="item-imagem"
                />
                <span>{{ item.produto ? item.produto.nome : 'Produto' }} - Quantidade: {{ item.quantidade }} - R$ {{ item.preco ? item.preco.toFixed(2) : '0.00' }}</span>
              </li>
            </ul>
          </div>
          <div v-if="pedidoSelecionado.endereco" class="detalhe-item">
            <strong>Endereço de Entrega:</strong>
            <p>{{ pedidoSelecionado.endereco.rua }}, {{ pedidoSelecionado.endereco.numero }}<br>
            {{ pedidoSelecionado.endereco.bairro }}, {{ pedidoSelecionado.endereco.cidade }} - {{ pedidoSelecionado.endereco.estado }}<br>
            CEP: {{ pedidoSelecionado.endereco.cep }}</p>
          </div>
        </div>
        <button @click="fecharModal" class="btn-fechar">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { pedidoService } from '@/services/pedidoService';
import { produtoService } from '@/services/produtoService';
import { authService } from '@/services/authService';

// Estado
const pedidos = ref([]);
const pedidosFiltrados = ref([]);
const loading = ref(false);
const statusFilter = ref('');
const searchQuery = ref('');
const pedidoSelecionado = ref(null);

// Carregar pedidos do usuário
onMounted(async () => {
  await carregarPedidos();
});

const carregarPedidos = async () => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) return;

  loading.value = true;
  try {
    const userPedidos = await pedidoService.buscarPorUsuario(currentUser.uid);

    // Carregar detalhes dos produtos para cada pedido
    for (const pedido of userPedidos) {
      if (pedido.itens) {
        for (const item of pedido.itens) {
          if (item.produtoId && !item.produto) {
            try {
              item.produto = await produtoService.buscarPorId(item.produtoId);
            } catch (error) {
              console.error('Erro ao carregar produto:', error);
            }
          }
        }
      }
    }

    pedidos.value = userPedidos;
    pedidosFiltrados.value = userPedidos;
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
  } finally {
    loading.value = false;
  }
};

// Filtrar pedidos
const filtrarPedidos = () => {
  let filtrados = pedidos.value;

  // Filtro por status
  if (statusFilter.value) {
    filtrados = filtrados.filter(pedido => pedido.status === statusFilter.value);
  }

  // Busca por número do pedido ou nome do produto
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtrados = filtrados.filter(pedido => {
      const numeroMatch = (pedido.numeroPedido || pedido.id).toLowerCase().includes(query);
      const produtoMatch = pedido.itens && pedido.itens.some(item =>
        item.produto && item.produto.nome.toLowerCase().includes(query)
      );
      return numeroMatch || produtoMatch;
    });
  }

  pedidosFiltrados.value = filtrados;
};

// Obter label do status
const getStatusLabel = (status) => {
  const labels = {
    pendente: 'Pendente',
    processando: 'Processando',
    enviado: 'Enviado',
    entregue: 'Entregue',
    cancelado: 'Cancelado'
  };
  return labels[status] || status;
};

// Ver detalhes do pedido
const verDetalhes = (pedido) => {
  pedidoSelecionado.value = pedido;
};

// Fechar modal
const fecharModal = () => {
  pedidoSelecionado.value = null;
};

// Formatar data
const formatarData = (data) => {
  if (!data) return '';
  const date = data.toDate ? data.toDate() : new Date(data);
  return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
};
</script>

<style scoped>
.meus-pedidos {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-group,
.search-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group select,
.search-group input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-group input {
  min-width: 300px;
}

.pedidos-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.produto-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.produto-imagem {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-pendente { background-color: #fff3cd; color: #856404; }
.status-processando { background-color: #cce5ff; color: #004085; }
.status-enviado { background-color: #d1ecf1; color: #0c5460; }
.status-entregue { background-color: #d4edda; color: #155724; }
.status-cancelado { background-color: #f8d7da; color: #721c24; }

.btn-detalhes {
  padding: 0.5rem 1rem;
  background-color: #d4af37;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-detalhes:hover {
  background-color: #c49b2a;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.pedido-detalhes {
  margin: 1rem 0;
}

.detalhe-item {
  margin-bottom: 1rem;
}

.detalhe-item strong {
  display: block;
  margin-bottom: 0.5rem;
}

.itens-lista {
  list-style: none;
  padding: 0;
}

.itens-lista li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.item-imagem {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.btn-fechar {
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.btn-fechar:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-group input {
    min-width: auto;
  }

  table {
    font-size: 0.875rem;
  }

  th, td {
    padding: 0.5rem;
  }

  .produto-info {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<template>
  <div class="lista-pedidos">
    <h2>Lista de Pedidos</h2>
    <p>Gerencie todos os pedidos realizados na plataforma.</p>
    <div v-if="loading" class="loading">Carregando pedidos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="search-bar">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar por cliente ou ID do pedido..."
          class="search-input"
        />
        <i class="fas fa-search search-icon"></i>
      </div>
      <table class="pedidos-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in filteredPedidos" :key="pedido.id">
            <td>#{{ pedido.id.slice(-8) }}</td>
            <td>{{ pedido.clienteNome || 'Cliente não encontrado' }}</td>
            <td>{{ pedido.dataFormatada }}</td>
            <td>{{ pedido.valorFormatado }}</td>
            <td>{{ pedido.status }}</td>
            <td>
              <router-link :to="{ name: 'pedido-detalhes', params: { id: pedido.id } }" class="btn-detalhes">
                Ver Detalhes
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { pedidoService } from '@/services/pedidoService'
import { usuarioService } from '@/services/usuarioService'

const pedidos = ref([])
const loading = ref(true)
const error = ref(null)
const searchTerm = ref('')

const filteredPedidos = computed(() => {
  if (!searchTerm.value) return pedidos.value
  const term = searchTerm.value.toLowerCase()
  return pedidos.value.filter(pedido =>
    pedido.clienteNome?.toLowerCase().includes(term) ||
    pedido.id.toLowerCase().includes(term)
  )
})

const carregarPedidos = async () => {
  try {
    const todosPedidos = await pedidoService.listarTodos()

    const pedidosComClientes = await Promise.all(
      todosPedidos.map(async (pedido) => {
        try {
          const cliente = await usuarioService.buscarPorId(pedido.userId)
          const clienteNome = cliente ? cliente.nome : 'Cliente não encontrado'

          const dataFormatada = new Date(pedido.dataCriacao.seconds * 1000).toLocaleDateString('pt-BR')
          const valorFormatado = pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

          return {
            ...pedido,
            clienteNome,
            dataFormatada,
            valorFormatado
          }
        } catch (err) {
          console.error(`Erro ao buscar cliente para pedido ${pedido.id}:`, err)
          return {
            ...pedido,
            clienteNome: 'Erro ao carregar',
            dataFormatada: new Date(pedido.dataCriacao.seconds * 1000).toLocaleDateString('pt-BR'),
            valorFormatado: pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        }
      })
    )

    pedidos.value = pedidosComClientes
  } catch (err) {
    error.value = 'Erro ao carregar pedidos: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarPedidos()
})
</script>

<style scoped>
.lista-pedidos {
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}

.error {
  color: red;
}

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.pedidos-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.pedidos-table th, .pedidos-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.pedidos-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.btn-detalhes {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-detalhes:hover {
  background-color: #0056b3;
}
</style>

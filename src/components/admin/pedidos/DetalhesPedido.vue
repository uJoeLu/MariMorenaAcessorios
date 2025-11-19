<template>
  <div class="detalhes-pedido-container">
    <router-link to="/admin/pedidos" class="btn-voltar">
      <i class="fas fa-arrow-left"></i> Voltar para Lista de Pedidos
    </router-link>

    <div v-if="loading" class="loading">Carregando detalhes do pedido...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="detalhes-pedido-card">
      <div class="status-section">
        <div class="status-display">
          <span class="status-label">Status:</span>
          <span :class="['status-badge', statusClass]">{{ pedido.status }}</span>
        </div>
        <div class="status-actions">
          <button v-for="status in statusOptions" :key="status.value" :class="['status-btn', status.class]" @click="alterarStatus(status.value)">
            {{ status.label }}
          </button>
          <button class="btn-save" @click="salvarStatus" :disabled="!statusMudou">
            <i class="fas fa-save"></i> Salvar
          </button>
        </div>
      </div>

      <div class="section">
        <h3>Informações Gerais</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>Pedido #{{ pedido.id.slice(-8).toUpperCase() }}</strong>
          </div>
          <div class="info-item">
            <strong>Data:</strong> {{ dataFormatada }}
          </div>
          <div class="info-item">
            <strong>Método de Pagamento:</strong> {{ pedido.metodoPagamento || 'N/A' }}
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Informações do Cliente</h3>
        <div class="client-grid">
          <div class="client-column">
            <h4>Contato</h4>
            <p><strong>Nome:</strong> {{ cliente?.nome || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ cliente?.email || 'N/A' }}</p>
            <p><strong>Telefone:</strong> {{ cliente?.telefone || 'N/A' }}</p>
          </div>
          <div class="client-column">
            <h4>Endereço</h4>
            <p>{{ pedido.enderecoEntrega || cliente?.endereco || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Itens do Pedido</h3>
        <div v-if="pedido.produtos && pedido.produtos.length > 0" class="items-list">
          <div v-for="(item, index) in pedido.produtos" :key="index" class="item-row">
            <div class="item-info">
              <strong>{{ typeof item === 'string' ? item : item.nome }}</strong>
              <span v-if="item.cor || item.material"> - {{ item.cor || item.material }}</span>
            </div>
            <div class="item-details">
              <span>Qty: {{ item.quantidade || 1 }}</span>
              <span>{{ (item.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
            </div>
          </div>
        </div>
        <p v-else>Sem itens registrados.</p>
      </div>

      <div class="section">
        <h3>Resumo da Compra</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span>Subtotal:</span>
            <span>{{ subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
          </div>
          <div class="summary-item">
            <span>Frete:</span>
            <span>{{ (pedido.frete || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
          </div>
          <div class="summary-item">
            <span>Desconto:</span>
            <span>{{ (pedido.desconto || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
          </div>
          <div class="summary-item total">
            <span><strong>Total:</strong></span>
            <span><strong>{{ valorTotalFormatado }}</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pedidoService } from '@/services/pedidoService'
import { usuarioService } from '@/services/usuarioService'

const route = useRoute()

const pedido = ref(null)
const cliente = ref(null)
const loading = ref(true)
const error = ref(null)
const statusAtual = ref('')

const statusOptions = [
  { value: 'Aguardando pagamento', label: 'Aguardando Pagamento', class: 'status-critical' },
  { value: 'Processando', label: 'Processando', class: 'status-attention' },
  { value: 'Enviado', label: 'Enviado', class: 'status-attention' },
  { value: 'Entregue', label: 'Entregue', class: 'status-success' },
  { value: 'Cancelar', label: 'Cancelar', class: 'status-critical' }
]

const statusMudou = computed(() => statusAtual.value !== pedido.value?.status)

const statusClass = computed(() => {
  const status = pedido.value?.status
  if (status === 'Entregue') return 'status-success'
  if (status === 'Processando' || status === 'Enviado') return 'status-attention'
  return 'status-critical'
})

const dataFormatada = computed(() => {
  if (!pedido.value?.dataCriacao) return 'N/A'
  const date = new Date(pedido.value.dataCriacao.seconds * 1000)
  return date.toLocaleDateString('pt-BR')
})

const valorTotalFormatado = computed(() => {
  return (pedido.value?.valorTotal || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
})

const subtotal = computed(() => {
  if (!pedido.value?.produtos) return 0
  return pedido.value.produtos.reduce((sum, item) => {
    const preco = typeof item === 'object' ? item.preco || 0 : 0
    const qtd = typeof item === 'object' ? item.quantidade || 1 : 1
    return sum + (preco * qtd)
  }, 0)
})

const carregarDados = async () => {
  try {
    const id = route.params.id
    pedido.value = await pedidoService.buscarPorId(id)
    statusAtual.value = pedido.value.status

    if (pedido.value.userId) {
      cliente.value = await usuarioService.buscarPorId(pedido.value.userId)
    }
  } catch (err) {
    error.value = 'Erro ao carregar dados: ' + err.message
  } finally {
    loading.value = false
  }
}

const alterarStatus = (novoStatus) => {
  statusAtual.value = novoStatus
}

const salvarStatus = async () => {
  try {
    await pedidoService.atualizar(pedido.value.id, { status: statusAtual.value })
    pedido.value.status = statusAtual.value
    // Usar uma notificação mais amigável ou toast ao invés de alert
    alert('Status atualizado com sucesso!')
  } catch (err) {
    console.error('Erro ao salvar status:', err)
    alert('Erro ao atualizar status: ' + err.message)
  }
}

onMounted(() => {
  carregarDados()
})
</script>

<style scoped>
.detalhes-pedido-container {
  min-height: 100vh;
  background-color: #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-voltar {
  align-self: flex-start;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.btn-voltar:hover {
  background-color: #0056b3;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: white;
}

.error {
  color: #ff6b6b;
}

.detalhes-pedido-card {
  background-color: #f8f5e6;
  border-radius: 12px;
  padding: 30px;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.status-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.status-display {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-label {
  font-weight: bold;
  font-size: 18px;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}

.status-success {
  background-color: #28a745;
  color: white;
}

.status-attention {
  background-color: #ffc107;
  color: black;
}

.status-critical {
  background-color: #dc3545;
  color: white;
}

.status-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.status-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.status-btn.status-success {
  background-color: #28a745;
  color: white;
}

.status-btn.status-attention {
  background-color: #ffc107;
  color: black;
}

.status-btn.status-critical {
  background-color: #dc3545;
  color: white;
}

.btn-save {
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-save:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.info-item {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.client-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.client-column {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.client-column h4 {
  margin-bottom: 15px;
  color: #555;
}

.client-column p {
  margin: 8px 0;
}

.items-list {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.item-row:last-child {
  border-bottom: none;
}

.item-info {
  flex: 1;
}

.item-details {
  display: flex;
  gap: 20px;
  font-weight: bold;
}

.summary-grid {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.summary-item:last-child {
  border-bottom: none;
  border-top: 2px solid #333;
  margin-top: 10px;
  padding-top: 15px;
}

.summary-item.total {
  font-size: 18px;
}

@media (max-width: 768px) {
  .detalhes-pedido-card {
    padding: 20px;
  }

  .status-section {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .client-grid {
    grid-template-columns: 1fr;
  }

  .item-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item-details {
    align-self: flex-end;
  }
}
</style>

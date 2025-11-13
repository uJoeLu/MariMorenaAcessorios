<template>
  <div class="dashboard-container">
    <div class="dashboard-card">
      <h1 class="titulo-principal">Dashboard</h1>

      <!-- KPIs Section -->
      <div class="kpis-section">
        <div class="kpi-card">
          <div class="kpi-content">
            <div class="kpi-value">{{ pedidosHoje }}</div>
            <div class="kpi-label">Pedidos hoje</div>
          </div>
          <div class="kpi-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-content">
            <div class="kpi-value">{{ estoque }}</div>
            <div class="kpi-label">Estoque</div>
          </div>
          <div class="kpi-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-content">
            <div class="kpi-value">{{ vendasMes }}</div>
            <div class="kpi-label">Vendas no mês</div>
          </div>
          <div class="kpi-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-content">
            <div class="kpi-value">{{ clientesAtivos }}</div>
            <div class="kpi-label">Clientes ativos</div>
          </div>
          <div class="kpi-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <!-- Modules Section -->
      <div class="modules-section">
        <!-- Novos Pedidos -->
        <div class="module-panel">
          <h2 class="module-title">Novos pedidos</h2>
          <div v-if="loadingPedidos" class="loading">Carregando pedidos...</div>
          <div v-else-if="errorPedidos" class="error">{{ errorPedidos }}</div>
          <div v-else class="pedidos-list">
            <div v-for="pedido in pedidosRecentes" :key="pedido.id" class="pedido-item">
              <div class="pedido-info">
                <span class="pedido-numero">nº {{ pedido.numero }}</span>
                <span class="pedido-produto">{{ pedido.produtoNome }}</span>
              </div>
              <div class="pedido-status">
                <i v-if="pedido.status === 'processando'" class="fas fa-spinner fa-spin status-loading"></i>
                <i v-else-if="pedido.status === 'concluido'" class="fas fa-check status-completed"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Produtos Mais Vendidos -->
        <div class="module-panel">
          <h2 class="module-title">Produtos mais vendidos</h2>
          <div v-if="loadingProdutos" class="loading">Carregando produtos...</div>
          <div v-else-if="errorProdutos" class="error">{{ errorProdutos }}</div>
          <div v-else class="produtos-list">
            <div v-for="produto in produtosVendidos" :key="produto.id" class="produto-item">
              <span class="produto-nome">{{ produto.nome }}</span>
              <span class="produto-volume">{{ produto.volume }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pedidoService } from '@/services/pedidoService'
import { produtoService } from '@/services/produtoService'
import { usuarioService } from '@/services/usuarioService'

const pedidosHoje = ref('--')
const estoque = ref('--')
const vendasMes = ref('R$ --,--')
const clientesAtivos = ref('--')

const pedidosRecentes = ref([])
const loadingPedidos = ref(true)
const errorPedidos = ref(null)

const produtosVendidos = ref([])
const loadingProdutos = ref(true)
const errorProdutos = ref(null)

const carregarKPIs = async () => {
  try {
    const hoje = new Date().toISOString().split('T')[0]
    const pedidos = await pedidoService.listarTodos()
    const pedidosHojeCount = pedidos.filter(p => p.dataCriacao && p.dataCriacao.toDate().toISOString().split('T')[0] === hoje).length
    pedidosHoje.value = pedidosHojeCount

    const produtos = await produtoService.listarTodos()
    const estoqueTotal = produtos.reduce((sum, p) => sum + (p.estoque || 0), 0)
    estoque.value = estoqueTotal

    const mesAtual = new Date().getMonth() + 1
    const anoAtual = new Date().getFullYear()
    const vendas = pedidos.filter(p => {
      if (!p.dataCriacao) return false
      const data = p.dataCriacao.toDate ? p.dataCriacao.toDate() : new Date(p.dataCriacao)
      return data.getMonth() + 1 === mesAtual && data.getFullYear() === anoAtual
    })
    const totalVendas = vendas.reduce((sum, p) => sum + (p.total || 0), 0)
    vendasMes.value = totalVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const usuarios = await usuarioService.listarTodos()
    clientesAtivos.value = usuarios.length
  } catch (err) {
    console.error('Erro ao carregar KPIs:', err)
  }
}

const carregarPedidosRecentes = async () => {
  try {
    const pedidos = await pedidoService.listarTodos()
    pedidosRecentes.value = pedidos.slice(0, 4).map((p, index) => ({
      id: p.id,
      produtoNome: p.itens[0]?.nome || 'Produto',
      status: index < 2 ? 'processando' : 'concluido'
    }))
  } catch (err) {
    errorPedidos.value = 'Erro ao carregar pedidos: ' + err.message
  } finally {
    loadingPedidos.value = false
  }
}

const carregarProdutosVendidos = async () => {
  try {
    const produtos = await produtoService.listarTodos()
    // Simular vendas: ordenar por estoque decrescente como proxy
    produtosVendidos.value = produtos
      .sort((a, b) => b.estoque - a.estoque)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        nome: p.nome,
        volume: p.estoque 
      }))
  } catch (err) {
    errorProdutos.value = 'Erro ao carregar produtos: ' + err.message
  } finally {
    loadingProdutos.value = false
  }
}

onMounted(() => {
  carregarKPIs()
  carregarPedidosRecentes()
  carregarProdutosVendidos()
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #1a1a1a; /* Fundo escuro */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.dashboard-card {
  background-color: #f5f5dc; /* Bege/amarelo claro */
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1400px;
}

.titulo-principal {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.kpis-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.kpi-card {
  background-color: #e0e0e0; /* Cinza-claro */
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.kpi-content {
  flex: 1;
}

.kpi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.kpi-label {
  font-size: 1rem;
  color: #666;
  margin-top: 5px;
}

.kpi-icon {
  color: #666;
  font-size: 1.5rem;
}

.modules-section {
  display: flex;
  gap: 20px;
}

.module-panel {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.module-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: red;
}

.pedidos-list, .produtos-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pedido-item, .produto-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.pedido-info {
  display: flex;
  flex-direction: column;
}

.pedido-numero {
  font-weight: bold;
  color: #333;
}

.pedido-produto {
  color: #666;
  font-size: 0.9rem;
}

.pedido-status {
  font-size: 1.2rem;
}

.status-loading {
  color: #ffc107;
}

.status-completed {
  color: #28a745;
}

.produto-nome {
  flex: 1;
  color: #333;
}

.produto-volume {
  font-weight: bold;
  color: #333;
}
</style>

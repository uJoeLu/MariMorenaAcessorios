<template>
    <div class="relatorios-container">
        <div class="relatorios-card">
            <h1 class="titulo-principal">Relatórios</h1>

            <div class="kpis-section">
                <div class="kpi-card">
                    <div class="kpi-content">
                        <div class="kpi-value">{{ receitaTotal }}</div>
                        <div class="kpi-label">Receita total</div>
                    </div>
                    <div class="kpi-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-content">
                        <div class="kpi-value">{{ totalPedidos }}</div>
                        <div class="kpi-label">Total de Pedidos</div>
                    </div>
                    <div class="kpi-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-content">
                        <div class="kpi-value">{{ novoCliente }}</div>
                        <div class="kpi-label">Novo Cliente</div>
                    </div>
                    <div class="kpi-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-content">
                        <div class="kpi-value">{{ mediaPedidos }}</div>
                        <div class="kpi-label">Média de Pedidos</div>
                    </div>
                    <div class="kpi-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>

            <div class="trend-section">
                <h2 class="section-title">Visualização de Tendência</h2>
                <div class="filters">
                    <div class="filter-group">
                        <label for="dataInicio">Data Início:</label>
                        <input type="date" id="dataInicio" v-model="dataInicio" @change="carregarTendencia" />
                    </div>
                    <div class="filter-group">
                        <label for="dataFinal">Data Final:</label>
                        <input type="date" id="dataFinal" v-model="dataFinal" @change="carregarTendencia" />
                    </div>
                </div>
                <div class="chart-container">
                    <LineChart :data="chartData" :options="chartOptions" />
                </div>
            </div>

            <div class="customer-section">
                <div class="customer-panel">
                    <h3 class="panel-title">Faturamento por cliente (Valor)</h3>
                    <div v-if="loadingClientes" class="loading">Carregando clientes...</div>
                    <div v-else class="client-list">
                        <div v-for="cliente in clientesPorValor" :key="cliente.id" class="client-item">
                            <span class="client-name">{{ cliente.nome }}</span>
                            <span class="client-value">{{ cliente.valor }}</span>
                        </div>
                    </div>
                </div>
                <div class="customer-panel">
                    <h3 class="panel-title">Clientes recorrentes (Engajamento)</h3>
                    <div v-if="loadingClientes" class="loading">Carregando clientes...</div>
                    <div v-else class="client-list">
                        <div v-for="cliente in clientesRecorrentes" :key="cliente.id" class="client-item">
                            <span class="client-name">{{ cliente.nome }}</span>
                            <span class="client-qtd">{{ cliente.qtd }}</span>
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
import { usuarioService } from '@/services/usuarioService'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// KPIs
const receitaTotal = ref('R$ --,--')
const totalPedidos = ref('--')
const novoCliente = ref('--')
const mediaPedidos = ref('R$ --,--')

// Trend
const dataInicio = ref('')
const dataFinal = ref('')
const chartData = ref({
    labels: [],
    datasets: [{
        label: 'Vendas (R$)',
        data: [],
        borderColor: '#333',
        backgroundColor: 'rgba(51, 51, 51, 0.1)',
        tension: 0.1
    }]
})
const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tendência de Vendas',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return 'R$ ' + value.toLocaleString('pt-BR')
                }
            }
        }
    }
})

// Customers
const clientesPorValor = ref([])
const clientesRecorrentes = ref([])
const loadingClientes = ref(true)

const carregarKPIs = async () => {
    try {
        const pedidos = await pedidoService.listarTodos()
        const usuarios = await usuarioService.listarTodos()

        // Receita total
        const total = pedidos.reduce((sum, p) => sum + (p.total || 0), 0)
        receitaTotal.value = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        // Total de Pedidos
        totalPedidos.value = pedidos.length

        // Novo Cliente (simular: usuários criados no último mês)
        const mesAtual = new Date().getMonth() + 1
        const anoAtual = new Date().getFullYear()
        const novos = usuarios.filter(u => {
            if (!u.dataCriacao) return false
            const data = u.dataCriacao.toDate ? u.dataCriacao.toDate() : new Date(u.dataCriacao)
            return data.getMonth() + 1 === mesAtual && data.getFullYear() === anoAtual
        }).length
        novoCliente.value = novos

        // Média de Pedidos
        const media = pedidos.length > 0 ? total / pedidos.length : 0
        mediaPedidos.value = media.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    } catch (err) {
        console.error('Erro ao carregar KPIs:', err)
    }
}

const carregarTendencia = async () => {
    if (!dataInicio.value || !dataFinal.value) return

    try {
        const pedidos = await pedidoService.listarTodos()
        const inicio = new Date(dataInicio.value)
        const fim = new Date(dataFinal.value)

        const vendasPorDia = {}
        pedidos.forEach(p => {
            if (!p.dataCriacao) return
            const data = p.dataCriacao.toDate ? p.dataCriacao.toDate() : new Date(p.dataCriacao)
            if (data >= inicio && data <= fim) {
                const dia = data.toISOString().split('T')[0]
                vendasPorDia[dia] = (vendasPorDia[dia] || 0) + (p.total || 0)
            }
        })

        const labels = Object.keys(vendasPorDia).sort()
        const data = labels.map(dia => vendasPorDia[dia])

        chartData.value.labels = labels
        chartData.value.datasets[0].data = data
    } catch (err) {
        console.error('Erro ao carregar tendência:', err)
    }
}

const carregarClientes = async () => {
    try {
        const pedidos = await pedidoService.listarTodos()
        const usuarios = await usuarioService.listarTodos()
        const usuarioMap = {}
        usuarios.forEach(u => {
            usuarioMap[u.id] = u.nome || 'Cliente'
        })

        const clienteStats = {}
        pedidos.forEach(p => {
            const userId = p.usuarioId
            if (!clienteStats[userId]) {
                clienteStats[userId] = { valor: 0, qtd: 0, nome: usuarioMap[userId] || 'Cliente' }
            }
            clienteStats[userId].valor += p.total || 0
            clienteStats[userId].qtd += 1
        })

        clientesPorValor.value = Object.values(clienteStats)
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 5)
            .map(c => ({
                id: c.id,
                nome: c.nome,
                valor: c.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }))

        clientesRecorrentes.value = Object.values(clienteStats)
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 5)
            .map(c => ({
                id: c.id,
                nome: c.nome,
                qtd: c.qtd
            }))
    } catch (err) {
        console.error('Erro ao carregar clientes:', err)
    } finally {
        loadingClientes.value = false
    }
}

onMounted(() => {
    carregarKPIs()
    carregarClientes()
    const hoje = new Date()
    const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000)
    dataInicio.value = trintaDiasAtras.toISOString().split('T')[0]
    dataFinal.value = hoje.toISOString().split('T')[0]
    carregarTendencia()
})
</script>

<style scoped>
.relatorios-container {
    min-height: 100vh;
    background-color: #f5f5dc;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.relatorios-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    width: 100%;
    max-width: 1400px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.titulo-principal {
    font-size: 2.4rem;
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-weight: bold;
}

/* KPIs */
.kpis-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.kpi-card {
    background-color: #fafafa;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    transition: 0.2s ease;
}

.kpi-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.kpi-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
}

.kpi-label {
    font-size: 1rem;
    color: #777;
    margin-top: 4px;
}

.kpi-icon {
    font-size: 1.6rem;
    color: #666;
    opacity: 0.7;
}

/* Trend section */
.trend-section {
    margin-bottom: 40px;
}

.section-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
}

.filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.filter-group label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #444;
}

.filter-group input {
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.chart-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
}

/* Clientes */
.customer-section {
    display: flex;
    gap: 20px;
}

.customer-panel {
    flex: 1;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #e0e0e0;
}

.panel-title {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
}

.client-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.client-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-radius: 6px;
    background-color: #fafafa;
    border: 1px solid #ddd;
}

.client-name {
    font-weight: 600;
    color: #333;
}

.client-value, .client-qtd {
    font-weight: bold;
    color: #444;
}

/* Loading */
.loading {
    text-align: center;
    padding: 20px;
    font-size: 1.1rem;
    color: #444;
}
</style>


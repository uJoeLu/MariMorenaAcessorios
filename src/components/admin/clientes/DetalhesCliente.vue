<template>
  <div class="detalhes-cliente">
    <div v-if="loading" class="loading">Carregando detalhes do cliente...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="cliente-info">
        <h2>Detalhes do Cliente</h2>
        <p><strong>Nome:</strong> {{ cliente.nome }}</p>
        <p><strong>Email:</strong> {{ cliente.email }}</p>
        <p><strong>Telefone:</strong> {{ cliente.telefone || 'N/A' }}</p>
        <p><strong>Data de Nascimento:</strong> {{ cliente.dataNascimento ? new Date(cliente.dataNascimento).toLocaleDateString('pt-BR') : 'N/A' }}</p>
        <p><strong>Data de Cadastro:</strong> {{ cliente.dataCadastro ? new Date(cliente.dataCadastro).toLocaleDateString('pt-BR') : 'N/A' }}</p>
        <p><strong>Endereço:</strong> {{ cliente.endereco || 'N/A' }}</p>
        <p><strong>Total Gasto:</strong> {{ totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        <div class="acoes">
          <button class="btn-email" @click="enviarEmail">Enviar email</button>
        </div>
      </div>

      <div class="historico-compras">
        <h3>Histórico de Compras</h3>
        <table v-if="pedidos.length > 0" class="compras-table">
          <thead>
            <tr>
              <th>Número de pedido</th>
              <th>Data</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Produtos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.id">
              <td>#{{ pedido.id.slice(-3).toUpperCase() }}</td>
              <td>{{ new Date(pedido.dataCriacao.seconds * 1000).toLocaleDateString('pt-BR') }}</td>
              <td>{{ pedido.status }}</td>
              <td>{{ (pedido.valorTotal || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
              <td>{{ pedido.produtos ? pedido.produtos.map(p => typeof p === 'string' ? p : p.nome).join(', ') : 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Sem compras registradas.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usuarioService } from '@/services/usuarioService'
import { pedidoService } from '@/services/pedidoService'

const route = useRoute()

const cliente = ref(null)
const pedidos = ref([])
const loading = ref(true)
const error = ref(null)
const totalGasto = ref(0)

const carregarDados = async () => {
  try {
    const id = route.params.id
    cliente.value = await usuarioService.buscarPorId(id)
    pedidos.value = await pedidoService.buscarPorUsuario(id)

    totalGasto.value = pedidos.value
      .reduce((sum, p) => sum + (p.valorTotal || 0), 0)
  } catch (err) {
    error.value = 'Erro ao carregar dados: ' + err.message
  } finally {
    loading.value = false
  }
}

const enviarEmail = () => {
  if (cliente.value && cliente.value.email) {
    window.location.href = `mailto:${cliente.value.email}`
  }
}

onMounted(() => {
  carregarDados()
})
</script>

<style scoped>
.detalhes-cliente {
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

.cliente-info {
  margin-bottom: 40px;
}

.cliente-info h2 {
  margin-bottom: 20px;
}

.cliente-info p {
  margin: 10px 0;
}

.acoes {
  margin-top: 20px;
}

.acoes button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.btn-alterar {
  background-color: green;
}

.btn-alterar:hover {
  background-color: darkgreen;
}

.btn-email {
  background-color: cyan;
}

.btn-email:hover {
  background-color: darkcyan;
}

.btn-excluir {
  background-color: red;
}

.btn-excluir:hover {
  background-color: darkred;
}

.historico-compras h3 {
  margin-bottom: 20px;
}

.compras-table {
  width: 100%;
  border-collapse: collapse;
}

.compras-table th, .compras-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.compras-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>

<template>
  <div class="lista-clientes">
    <h2>Lista de Clientes</h2>
    <div v-if="loading" class="loading">Carregando clientes...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table class="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Última Compra</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefone || 'N/A' }}</td>
            <td>{{ cliente.ultimaCompra || 'N/A' }}</td>
            <td>{{ cliente.valorTotal }}</td>
            <td>
              <router-link :to="{ name: 'cliente-detalhes', params: { id: cliente.id } }" class="btn-detalhes">
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
import { ref, onMounted } from 'vue'
import { usuarioService } from '@/services/usuarioService'
import { pedidoService } from '@/services/pedidoService'

const clientes = ref([])
const loading = ref(true)
const error = ref(null)

const carregarClientes = async () => {
  try {
    const usuarios = await usuarioService.listarTodos()

    // Para cada cliente, buscar pedidos e calcular última compra e valor total
    const clientesComDados = await Promise.all(
      usuarios.map(async (cliente) => {
        try {
          const pedidos = await pedidoService.buscarPorUsuario(cliente.id)
          const pedidosCompletados = pedidos.filter(p => p.status === 'concluido')

          let ultimaCompra = 'N/A'
          let valorTotal = 0

          if (pedidosCompletados.length > 0) {
            // Última compra é a mais recente
            const pedidoMaisRecente = pedidosCompletados.sort((a, b) =>
              new Date(b.dataCriacao.seconds * 1000) - new Date(a.dataCriacao.seconds * 1000)
            )[0]
            ultimaCompra = new Date(pedidoMaisRecente.dataCriacao.seconds * 1000).toLocaleDateString('pt-BR')

            // Valor total é a soma de todos os pedidos concluídos
            valorTotal = pedidosCompletados.reduce((total, pedido) => total + (pedido.valorTotal || 0), 0)
          }

          return {
            ...cliente,
            ultimaCompra,
            valorTotal: valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        } catch (err) {
          console.error(`Erro ao buscar pedidos do cliente ${cliente.id}:`, err)
          return {
            ...cliente,
            ultimaCompra: 'N/A',
            valorTotal: 'R$ 0,00'
          }
        }
      })
    )

    clientes.value = clientesComDados
  } catch (err) {
    error.value = 'Erro ao carregar clientes: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarClientes()
})
</script>

<style scoped>
.lista-clientes {
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

.clientes-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.clientes-table th, .clientes-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.clientes-table th {
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
}

.btn-detalhes:hover {
  background-color: #0056b3;
}
</style>

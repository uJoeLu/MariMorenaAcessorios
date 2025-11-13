<template>
  <div class="lista-produtos-container">
    <div class="lista-produtos-card">
      <h1 class="titulo-principal">Produtos</h1>
      <div class="acoes-superior">
        <div class="barra-pesquisa">
          <div class="campo-pesquisa">
            <i class="fas fa-search"></i>
            <input
              v-model="termoPesquisa"
              type="text"
              placeholder="Buscar produtos..."
              @input="filtrarProdutos"
            />
          </div>
          <select v-model="filtroCategoria" @change="filtrarProdutos" class="filtro-rapido">
            <option value="">Todas as categorias</option>
            <option v-for="categoria in categoriasUnicas" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>
        <router-link to="/admin/produtos/cadastrar" class="btn-cadastrar">
          Cadastrar novo produto
        </router-link>
      </div>
      <div v-if="loading" class="loading">Carregando produtos...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <table class="produtos-table">
          <thead>
            <tr>
              <th>Miniatura</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtosFiltrados" :key="produto.id">
              <td>
                <img
                  v-if="produto.imagem"
                  :src="produto.imagem"
                  alt="Miniatura do produto"
                  class="miniatura"
                />
                <div v-else class="miniatura-placeholder">
                  <i class="fas fa-image"></i>
                </div>
              </td>
              <td>{{ produto.nome }}</td>
              <td>{{ produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
              <td>{{ produto.categoria }}</td>
              <td>{{ produto.estoque }}</td>
              <td class="acoes">
                <router-link
                  :to="{ name: 'atualizar-produto', params: { id: produto.id } }"
                  class="btn-acao btn-editar"
                  title="Editar"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
                <button
                  @click="confirmarExclusao(produto)"
                  class="btn-acao btn-excluir"
                  title="Excluir"
                >
                  <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { produtoService } from '@/services/produtoService'

const produtos = ref([])
const loading = ref(true)
const error = ref(null)
const termoPesquisa = ref('')
const filtroCategoria = ref('')
const produtoParaExcluir = ref(null)

const produtosFiltrados = computed(() => {
  let filtrados = produtos.value

  if (termoPesquisa.value) {
    filtrados = filtrados.filter(produto =>
      produto.nome.toLowerCase().includes(termoPesquisa.value.toLowerCase())
    )
  }

  if (filtroCategoria.value) {
    filtrados = filtrados.filter(produto => produto.categoria === filtroCategoria.value)
  }

  return filtrados
})

const categoriasUnicas = computed(() => {
  const categorias = produtos.value.map(produto => produto.categoria)
  return [...new Set(categorias)]
})

const carregarProdutos = async () => {
  try {
    const produtosData = await produtoService.listarTodos()
    produtos.value = produtosData
  } catch (err) {
    error.value = 'Erro ao carregar produtos: ' + err.message
  } finally {
    loading.value = false
  }
}

const filtrarProdutos = () => {
  // A filtragem é feita via computed
}

const confirmarExclusao = (produto) => {
  if (confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)) {
    excluirProduto(produto.id)
  }
}

const excluirProduto = async (id) => {
  try {
    await produtoService.excluir(id)
    produtos.value = produtos.value.filter(produto => produto.id !== id)
  } catch (err) {
    alert('Erro ao excluir produto: ' + err.message)
  }
}

onMounted(() => {
  carregarProdutos()
})
</script>

<style scoped>
.lista-produtos-container {
  min-height: 100vh;
  background-color: #1a1a1a; /* Fundo escuro */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.lista-produtos-card {
  background-color: #f5f5dc; /* Bege/amarelo claro */
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
}

.titulo-principal {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.acoes-superior {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.barra-pesquisa {
  display: flex;
  gap: 10px;
  flex: 1;
  max-width: 600px;
}

.campo-pesquisa {
  position: relative;
  flex: 1;
}

.campo-pesquisa i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.campo-pesquisa input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.filtro-rapido {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-width: 150px;
}

.btn-cadastrar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-cadastrar:hover {
  background-color: #218838;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: red;
}

.produtos-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.produtos-table th, .produtos-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.produtos-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.miniatura {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.miniatura-placeholder {
  width: 50px;
  height: 50px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #666;
}

.acoes {
  display: flex;
  gap: 10px;
}

.btn-acao {
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-editar {
  background-color: #007bff;
  color: white;
}

.btn-editar:hover {
  background-color: #0056b3;
}

.btn-excluir {
  background-color: #dc3545;
  color: white;
}

.btn-excluir:hover {
  background-color: #c82333;
}
</style>

import { defineStore } from 'pinia'
import { FavoritoService } from '@/service/favoritoService'
import { ref, computed } from 'vue'

const service = new FavoritoService()

export const useFavoritosStore = defineStore('favoritos', () => {
  const favoritos = ref([])
  const mensagem = ref(null)
  const erro = ref(null)

  const isFavorito = computed(() => (produtoId) =>
    favoritos.value.some((item) => item.produtoId === produtoId)
  )

  async function loadFavoritos() {
    try {
      favoritos.value = await service.listarFavoritos()
      erro.value = null
    } catch (e) {
      erro.value = e.message
      throw e
    }
  }

  async function adicionarFavorito(produto) {
    try {
      const favorito = await service.adicionarFavorito(produto)
      favoritos.value.push(favorito)
      mensagem.value = 'Item adicionado aos favoritos'
      erro.value = null
      return favorito
    } catch (e) {
      erro.value = e.message
      throw e
    }
  }

  async function removerFavorito(produtoId) {
    try {
      await service.removerFavorito(produtoId)
      favoritos.value = favoritos.value.filter(item => item.produtoId !== produtoId)
      mensagem.value = 'Item removido dos favoritos'
      erro.value = null
    } catch (e) {
      erro.value = e.message
      throw e
    }
  }

  async function toggleFavorito(produto) {
    try {
      if (isFavorito.value(produto.id)) {
        await removerFavorito(produto.id)
      } else {
        await adicionarFavorito(produto)
      }
    } catch (e) {
      erro.value = e.message
      throw e
    }
  }

  return {
    favoritos,
    mensagem,
    erro,
    isFavorito,
    loadFavoritos,
    adicionarFavorito,
    removerFavorito,
    toggleFavorito,
  }
})

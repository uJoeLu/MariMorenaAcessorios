import { defineStore } from "pinia";

export const useFavoritos = defineStore('favoritos', {

  state: () => ({
    favoritos: [],
  }),

  getters: {
    isFavorito: (state) => (produtoId) => {
      return state.favoritos.some(item => item.id === produtoId);
    },
  },

  actions: {
    adicionarFavorito(produto) {
      if (!this.isFavorito(produto.id)) {
        this.favoritos.push(produto);
      }
    },

    removerFavorito(produtoId) {
      this.favoritos = this.favoritos.filter(item => item.id !== produtoId);
    },

    toggleFavorito(produto) {
      if (this.isFavorito(produto.id)) {
        this.removerFavorito(produto.id);
      } else {
        this.adicionarFavorito(produto);
      }
    },
  },
});

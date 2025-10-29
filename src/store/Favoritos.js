import { defineStore } from "pinia";
import { getUsuarioLogado } from "@/service/autenticacao";

const getKey = () => {
  const usuario = getUsuarioLogado();
  return usuario ? `favoritos_${usuario.id}` : "favoritos";
};

const getFavoritosFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(getKey())) || [];
  } catch {
    return [];
  }
};

export const useFavoritos = defineStore("favoritos", {
  state: () => ({
    favoritos: getFavoritosFromStorage(),
    usuarioId: getUsuarioLogado()?.id || null,
  }),

  getters: {
    isFavorito: (state) => (produtoId) =>
      state.favoritos.some((item) => item.id === produtoId),
  },

  actions: {
    
    adicionarFavorito(produto) {
      if (!this.isFavorito(produto.id)) {
        this.favoritos.push(produto);
        this.saveToLocalStorage();
      }
    },

    removerFavorito(produtoId) {
      const index = this.favoritos.findIndex((item) => item.id === produtoId);
      if (index !== -1) {
        this.favoritos.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    toggleFavorito(produto) {
      if(!getUsuarioLogado()){
        return 'Você precisa estar logado para favoritar.';
      }
      this.isFavorito(produto.id)
        ? this.removerFavorito(produto.id)
        : this.adicionarFavorito(produto);
      return null;
    },

    saveToLocalStorage() {
      const usuario = getUsuarioLogado();
      this.usuarioId = usuario?.id || null;
      localStorage.setItem(getKey(), JSON.stringify(this.favoritos));
    },

    loadFavoritos() {
      this.favoritos = getFavoritosFromStorage();
      this.usuarioId = getUsuarioLogado()?.id || null;
    },
  },
});

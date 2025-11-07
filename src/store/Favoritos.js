import { defineStore } from "pinia";
import { FavoritoService } from "@/service/favoritoService";

const service = new FavoritoService();

export const useFavoritos = defineStore("favoritos", {
  state: () => ({
    favoritos: [],
    erro: null
  }),

  getters: {
    isFavorito: (state) => (produtoId) =>
      state.favoritos.some((item) => item.produtoId === produtoId),
  },

  actions: {
    async adicionarFavorito(produto) {
      try {
        const favorito = await service.adicionarFavorito(produto);
        this.favoritos.push(favorito);
        this.erro = null;
        return favorito;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async removerFavorito(produtoId) {
      try {
        await service.removerFavorito(produtoId);
        this.favoritos = this.favoritos.filter(item => item.produtoId !== produtoId);
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async toggleFavorito(produto) {
      try {
        await service.toggleFavorito(produto);
        if (this.isFavorito(produto.id)) {
          await this.removerFavorito(produto.id);
        } else {
          await this.adicionarFavorito(produto);
        }
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async loadFavoritos() {
      try {
        this.favoritos = await service.listarFavoritos();
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },
  },
});

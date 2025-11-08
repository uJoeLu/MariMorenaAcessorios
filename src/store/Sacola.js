import { defineStore } from "pinia";
import { SacolaService } from "@/service/sacolaService";
import { useAuthStore } from "@/store/authStore";

const service = new SacolaService();

export const useSacola = defineStore("sacola", {
  state: () => ({
    sacola: [],
    erro: null,
  }),

  getters: {
    cartCounter: (state) => state.sacola.length,
    totalQuantidade: (state) => state.sacola.reduce((total, item) => total + item.quantidade, 0),
    totalPreco: (state) => state.sacola.reduce((total, item) => total + (item.preco * item.quantidade), 0),
  },

  actions: {
    async adicionarNaSacola(produto) {
      try {
        const usuarioId = useAuthStore().usuario?.id || 'guest';
        const sacola = await service.adicionarItem(usuarioId, produto);
        this.sacola = sacola.itens;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async aumentarQtd(produtoId) {
      try {
        const usuarioId = useAuthStore().usuario?.id || 'guest';
        const produto = this.sacola.find(item => item.produtoId === produtoId);
        if (produto) {
          const sacola = await service.adicionarItem(usuarioId, { id: produtoId, nome: produto.nome, preco: produto.preco });
          this.sacola = sacola.itens;
        }
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async diminuirQtd(produtoId) {
      try {
        const usuarioId = useAuthStore().usuario?.id || 'guest';
        const sacola = await service.diminuirItem(usuarioId, produtoId);
        this.sacola = sacola.itens;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async removerItem(produtoId) {
      try {
        const usuarioId = useAuthStore().usuario?.id || 'guest';
        const sacola = await service.getSacola(usuarioId);
        sacola.itens = sacola.itens.filter(item => item.produtoId !== produtoId);
        const updated = await service.salvarSacola(sacola);
        this.sacola = updated.itens;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async limparSacola() {
      try {
        const usuarioId = useAuthStore().usuario?.id || 'guest';
        const sacola = await service.limparSacola(usuarioId);
        this.sacola = sacola.itens;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async loadSacola() {
      try {
        const usuarioId = useAuthStore().usuario?.id || 'guest';
        const sacola = await service.getSacola(usuarioId);
        this.sacola = sacola.itens;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    }
  },
});

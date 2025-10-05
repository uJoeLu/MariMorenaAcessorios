import { defineStore } from "pinia";

export const useSacola = defineStore('sacola', {
  
  state: () => ({
    sacola : [],
  }),

  getters: {
    cartCounter: (state) => {
      return state.sacola.length;
    },

    totalQuantidade: (state) => {
      return state.sacola.reduce((total, item) => total + item.quantidade, 0);
    },

    totalPreco: (state) => {
      return state.sacola.reduce((total, item,) => total + (item.preco * item.quantidade), 0);
    },
  },

  actions: {
    adicionarNaSacola(produto) {
      const itemExistente = this.sacola.find(item => item.id === produto.id);
      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        this.sacola.push({ ...produto, quantidade: 1 });
      }
    },
    
    aumentarQtd(produtoId) {
      const itemExistente = this.sacola.find(item => item.id === produtoId);
      if (itemExistente) {
        itemExistente.quantidade++;
      }
    },

    diminuirQtd(produtoId) {
      const itemIndex = this.sacola.findIndex(item => item.id === produtoId);

      if (itemIndex !== -1) {
        const itemExistente = this.sacola[itemIndex];

        if (itemExistente.quantidade > 1) {
          itemExistente.quantidade--;
        } else {
          this.sacola.splice(itemIndex, 1);
        }
      }
    },
    
    removerItem(produtoId) {
        this.sacola = this.sacola.filter(item => item.id !== produtoId);
    }
  },
});

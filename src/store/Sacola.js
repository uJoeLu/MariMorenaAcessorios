import { getUsuarioLogado } from "@/service/autenticacao";
import { defineStore } from "pinia";

const getKey = () => {
  const usuario = getUsuarioLogado();
  return usuario ? `sacola_${usuario.id}` : 'sacola';
}

const getSacolaFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(getKey())) || [];
  } catch {
    return [];
  }
};

export const useSacola = defineStore('sacola', {
  
  state: () => ({
    sacola: getSacolaFromStorage(),
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
        this.saveToLocalStorage();
      } else {
        this.sacola.push({ ...produto, quantidade: 1 });
        this.saveToLocalStorage();
      }
    },
    
    aumentarQtd(produtoId) {
      const itemExistente = this.sacola.find(item => item.id === produtoId);
      itemExistente.quantidade++;
      this.saveToLocalStorage();
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
        this.saveToLocalStorage();
      }
    },
    
    removerItem(produtoId) {
        this.sacola = this.sacola.filter(item => item.id !== produtoId);
        this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem(getKey(), JSON.stringify(this.sacola));
    },
    loadSacola() {
      this.sacola = getSacolaFromStorage();
    }
  },
});

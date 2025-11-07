import { defineStore } from "pinia";
import { SacolaDAO } from "@/dao/sacolaDao";
import { UsuarioDAO } from "@/dao/usuarioDao";

const dao = new SacolaDAO();
const usuarioDao = new UsuarioDAO();

const getKey = () => {
  try {
    const usuario = usuarioDao.getUsuarioLogado();
    return usuario ? `sacola_${usuario.id}` : 'sacola';
  } catch {
    return 'sacola';
  }
}

const getSacolaFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem(getKey())) || [];
    if (!Array.isArray(data)) return [];
    return data.filter(item => typeof item === 'object' && item !== null && item.id && typeof item.quantidade === 'number' && item.quantidade > 0);
  } catch {
    return [];
  }
};

export const useSacola = defineStore('sacola', {
  state: () => ({
    sacola: getSacolaFromStorage(),
    erro: null
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
    async adicionarNaSacola(produto) {
      try {
        const itemExistente = this.sacola.find(item => item.id === produto.id);
        if (itemExistente) {
          itemExistente.quantidade++;
        } else {
          this.sacola.push({ ...produto, quantidade: 1 });
        }
        await this.saveToLocalStorage();
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async aumentarQtd(produtoId) {
      try {
        const itemExistente = this.sacola.find(item => item.id === produtoId);
        if (itemExistente) {
          itemExistente.quantidade++;
          await this.saveToLocalStorage();
        }
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async diminuirQtd(produtoId) {
      try {
        const itemIndex = this.sacola.findIndex(item => item.id === produtoId);
        if (itemIndex !== -1) {
          const itemExistente = this.sacola[itemIndex];
          if (itemExistente.quantidade > 1) {
            itemExistente.quantidade--;
          } else {
            this.sacola.splice(itemIndex, 1);
          }
          await this.saveToLocalStorage();
        }
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async removerItem(produtoId) {
      try {
        this.sacola = this.sacola.filter(item => item.id !== produtoId);
        await this.saveToLocalStorage();
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async limparSacola() {
      try {
        this.sacola = [];
        await this.saveToLocalStorage();
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async saveToLocalStorage() {
      localStorage.setItem(getKey(), JSON.stringify(this.sacola));
    },

    async loadSacola() {
      try {
        this.sacola = getSacolaFromStorage();
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    }
  },
});

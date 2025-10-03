import { defineStore } from "pinia";

export const useSacola = defineStore('sacola', {
  
  // STATE: Onde os dados da sacola são armazenados
  state: () => ({
    // Usamos 'sacola' como o nome da propriedade, correspondendo à definição
    sacola : [],
  }),

  // GETTERS: Propriedades computadas para leitura de dados
  getters: {
    // Retorna a quantidade total de ITENS (produtos diferentes) na sacola
    cartCounter: (state) => {
      return state.sacola.length;
    },

    // Retorna a soma total das quantidades de todos os produtos
    totalQuantidade: (state) => {
      return state.sacola.reduce((total, item) => total + item.quantidade, 0);
    },
  },

  // ACTIONS: Métodos para alterar o STATE
  actions: {
    // Adiciona um produto à sacola ou incrementa a quantidade se já existir
    adicionarNaSacola(produto) {
      // Usamos 'this.sacola' para acessar o state
      const itemExistente = this.sacola.find(item => item.id === produto.id);
      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        this.sacola.push({ ...produto, quantidade: 1 });
      }
    },
    
    // Diminui a quantidade de um produto ou o remove se a quantidade chegar a 0
    diminuirQtd(produtoId) {
      const itemIndex = this.sacola.findIndex(item => item.id === produtoId);
      
      if (itemIndex > 0) {
        const itemExistente = this.sacola[itemIndex];
        
        if (itemExistente.quantidade > 1) {
          // Diminui a quantidade
          itemExistente.quantidade--;
        } else {
          // REMOVE o item se a quantidade for 1 (usando splice)
          this.sacola.splice(itemIndex, 1);
        }
      }
      // Se o item não for encontrado (itemIndex é -1), não faz nada.
    },
    
    // Action adicional (útil) para remover o item completamente
    removerItem(produtoId) {
        this.sacola = this.sacola.filter(item => item.id !== produtoId);
    }
  },
});

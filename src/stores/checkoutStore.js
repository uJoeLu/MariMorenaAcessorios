import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    endereco: null,
    pagamento: null,
    pedido: null
  }),

  actions: {
    setEndereco(endereco) {
      this.endereco = endereco;
    },

    setPagamento(pagamento) {
      this.pagamento = pagamento;
    },

    setPedido(pedido) {
      this.pedido = pedido;
    },

    limparCheckout() {
      this.endereco = null;
      this.pagamento = null;
      this.pedido = null;
    }
  },

  persist: true
});

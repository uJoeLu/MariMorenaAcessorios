import { defineStore } from "pinia";
import { getUsuarioLogado } from "@/service/autenticacao";

const getKey = () => {
  const usuario = getUsuarioLogado();
  return usuario ? `pedidos_${usuario.id}` : 'pedidos';
};

const getPedidosFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(getKey())) || [];
  } catch {
    return [];
  }
};

export const usePedidos = defineStore('pedidos', {
  state: () => ({
    pedidos: getPedidosFromStorage(),
  }),

  getters: {
    getPedidosPorUsuario: (state) => {
      return state.pedidos;
    },

    totalPedidos: (state) => {
      return state.pedidos.length;
    },

    pedidosPendentes: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'pendente');
    },

    pedidosConfirmados: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'confirmado');
    },
    pedidosEnviados: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'enviado');
    },
    pedidosCancelados: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'cancelado');
    },
    pedidosEntregues: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'entregue');
    },

  },

  actions: {
    adicionarPedido(items, totalPreco, totalQuantidade) {
      const usuario = getUsuarioLogado();
      if (!usuario) {
        throw new Error('Usuário não logado');
      }
      const novoPedido = {
        id: crypto.randomUUID(),
        usuarioId: usuario.id,
        items: [...items],
        totalPreco,
        totalQuantidade,
        data: new Date().toISOString(),
        status: 'pendente',
      };
      this.pedidos.push(novoPedido);
      this.salvarPedidos();
    },

    atualizarStatusPedido(pedidoId, novoStatus) {
      const pedido = this.pedidos.find(p => p.id === pedidoId);
      if (pedido) {
        pedido.status = novoStatus;
        this.salvarPedidos();
      }
    },

    cancelarPedido(pedidoId) {
      this.atualizarStatusPedido(pedidoId, 'cancelado');
    },

    salvarPedidos() {
      localStorage.setItem(getKey(), JSON.stringify(this.pedidos));
    },

    loadPedidos() {
      this.pedidos = getPedidosFromStorage();
    },
  },
});

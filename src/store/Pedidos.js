import { defineStore } from "pinia";
import { PedidoService } from "@/service/pedidoService";
import { UsuarioDAO } from "@/dao/usuarioDao";

const service = new PedidoService();
const usuarioDao = new UsuarioDAO();

const getKey = () => {
  try {
    const usuario = usuarioDao.getUsuarioLogado();
    return usuario ? `pedidos_${usuario.id}` : 'pedidos';
  } catch {
    return 'pedidos';
  }
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
    erro: null
  }),

  getters: {
    getPedidosPorUsuario: (state) => {
      return state.pedidos;
    },

    totalPedidos: (state) => {
      return state.pedidos.length;
    },

    pedidosPendentes: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'Pendente');
    },

    pedidosConfirmados: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'Confirmado');
    },

    pedidosEnviados: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'Enviado');
    },

    pedidosCancelados: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'Cancelado');
    },

    pedidosEntregues: (state) => {
      return state.pedidos.filter(pedido => pedido.status === 'Entregue');
    },
  },

  actions: {
    async criarPedido(itensSacola, enderecoId) {
      try {
        const pedido = await service.criarPedido(itensSacola, enderecoId);
        this.pedidos.push(pedido);
        this.erro = null;
        return pedido;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async atualizarStatusPedido(pedidoId, novoStatus) {
      try {
        const pedidoAtualizado = await service.atualizarStatusPedido(pedidoId, novoStatus);
        const index = this.pedidos.findIndex(p => p.id === pedidoId);
        if (index !== -1) {
          this.pedidos[index] = pedidoAtualizado;
        }
        this.erro = null;
        return pedidoAtualizado;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async cancelarPedido(pedidoId) {
      try {
        const pedidoCancelado = await service.cancelarPedido(pedidoId);
        const index = this.pedidos.findIndex(p => p.id === pedidoId);
        if (index !== -1) {
          this.pedidos[index] = pedidoCancelado;
        }
        this.erro = null;
        return pedidoCancelado;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async salvarPedidos() {
      localStorage.setItem(getKey(), JSON.stringify(this.pedidos));
    },

    async loadPedidos() {
      try {
        this.pedidos = await service.listarPedidosUsuario();
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },
  },
});

import { defineStore } from "pinia";
import { getUsuarioLogado } from '@/auth/autenticacao.js';

export const useComentarios = defineStore('comentarios', {
  state: () => ({
    comentarios: JSON.parse(localStorage.getItem('comentarios') || '[]'),
  }),

  getters: {
    getComentariosPorProduto: (state) => (produtoId) => {
      return state.comentarios.filter(comentario => comentario.produtoId === produtoId);
    },
  },

  actions: {
    adicionarComentario(produtoId, texto) {
      const usuario = getUsuarioLogado();
      if (!usuario) {
        throw new Error('Usuário não logado');
      }
      const novoComentario = {
        id: Date.now(),
        produtoId,
        usuario: usuario.nome,
        texto,
        data: new Date().toISOString(),
      };
      this.comentarios.push(novoComentario);
      this.salvarComentarios();
    },

    salvarComentarios() {
      localStorage.setItem('comentarios', JSON.stringify(this.comentarios));
    },
  },
});

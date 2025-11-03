import { defineStore } from "pinia";
import { getUsuarioLogado } from '@/service/autenticacao.js';

const getkey = () => {
  const usuario = getUsuarioLogado();
  return usuario ? `comentarios_${usuario.id}` : 'comentarios';
};
const getComentariosFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(getkey())) || [];
  } catch {
    return [];
  }
};

export const useComentarios = defineStore('comentarios', {
  state: () => ({
    comentarios: getComentariosFromStorage(),
  }),

  getters: {
    getComentariosPorProduto: (state) => (produtoId) => {
      return state.comentarios.filter(comentario => comentario.produtoId === produtoId);
    },
  },

  actions: {
    adicionarComentario(produto, texto) {
      const usuario = getUsuarioLogado();
      const 
      if (!usuario) {
        throw new Error('Usuário não logado');
      }
      const novoComentario = {
        id: Date.now(),
        produto,
        usuario: usuario.nome,
        texto,
        data: new Date().toISOString(),
      };
      this.comentarios.push(novoComentario);
      this.salvarComentarios();
    },

    salvarComentarios() {
      localStorage.setItem(getkey(), JSON.stringify(this.comentarios));
    },
    loadComentarios() {
      this.comentarios = getComentariosFromStorage();
    },
  },
});

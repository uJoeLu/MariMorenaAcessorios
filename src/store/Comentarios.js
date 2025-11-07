import { defineStore } from "pinia";
import { ComentarioService } from "@/service/comentarioService";

const service = new ComentarioService();

export const useComentarios = defineStore('comentarios', {
  state: () => ({
    comentarios: [],
    erro: null
  }),

  getters: {
    getComentariosPorProduto: (state) => (produtoId) => {
      return state.comentarios.filter(comentario => comentario.produtoId === produtoId);
    },
  },

  actions: {
    async adicionarComentario(produtoId, texto) {
      try {
        const comentario = await service.adicionarComentario(produtoId, texto);
        this.comentarios.push(comentario);
        this.erro = null;
        return comentario;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async removerComentario(comentarioId) {
      try {
        await service.removerComentario(comentarioId);
        this.comentarios = this.comentarios.filter(c => c.id !== comentarioId);
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },

    async loadComentarios(produtoId = null) {
      try {
        if (produtoId) {
          this.comentarios = await service.listarComentariosPorProduto(produtoId);
        } else {
          this.comentarios = await service.listarComentariosDoUsuario();
        }
        this.erro = null;
      } catch (error) {
        this.erro = error.message;
        throw error;
      }
    },
  },
});

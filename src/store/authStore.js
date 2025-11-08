import { defineStore } from "pinia";
import { AuthService } from "@/service/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuario: null,
    erro: null,
    mensagem: null,
    loading: false,
  }),

  getters: {
    isAutenticado: (state) => !!state.usuario,
  },

  actions: {
    async login(email, senha, service = new AuthService()) {
      this.loading = true;
      this.erro = null;
      this.mensagem = null;

      try {
        this.usuario = await service.login(email, senha);
        this.mensagem = "Login realizado com sucesso";
        return this.usuario;
      } catch (error) {
        this.erro = error.message || "Erro ao fazer login";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout(service = new AuthService()) {
      this.loading = true;
      this.erro = null;

      try {
        await service.logout();
        this.usuario = null;
        this.mensagem = "Logout realizado com sucesso";
      } catch (error) {
        this.erro = error.message || "Erro ao fazer logout";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async verificarSessao(service = new AuthService()) {
      this.loading = true;
      this.erro = null;

      try {
        this.usuario = await service.getUsuarioLogado();
      } catch (error) {
        this.erro = error.message || "Erro ao verificar sessão";
        this.usuario = null;
      } finally {
        this.loading = false;
      }
    },
  },
});

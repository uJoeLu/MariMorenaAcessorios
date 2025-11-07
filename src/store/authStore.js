import { defineStore } from "pinia";
import { AuthService } from "@/service/authService";

const authService = new AuthService();

export const useAuthStore = defineStore("auth", {
    state: () => ({
        usuario: null,
        erro: null
    }),
    getters:{
    
        isAutenticado: (state) => !!state.usuario,
    },
    actions: {
        async login(email, senha) {
            try {
                this.usuario = await authService.login(email, senha);
                this.erro = null;
                return this.usuario;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async logout() {
            try {
                await authService.logout();
                this.usuario = null;
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async verificarSessao() {
            this.usuario = await authService.getUsuarioLogado();
        },

    }
});

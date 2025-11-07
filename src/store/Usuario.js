import { defineStore } from "pinia";
import { UsuarioService } from "@/service/usuarioService";

const service = new UsuarioService();

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        usuario: null,
        erro: null
    }),
    actions: {
        async cadastrar(dadosUsuario, endereco) {
            try {
                const resultado = await service.cadastrar(dadosUsuario, endereco);
                this.usuario = resultado.usuario;
                this.erro = null;
                return resultado;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        async login(email, senha) {
            try {
                const usuario = await service.login(email, senha);
                this.usuario = usuario;
                this.erro = null;
                return usuario;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        logout() {
            service.logout();
            this.usuario = null;
        },
        async buscarEnderecos() {
            return await service.buscarEnderecosDoUsuario();
        },
        async atualizar(dados) {
            try {
                const usuarioAtualizado = await service.atualizar(this.usuario.id, dados);
                this.usuario = usuarioAtualizado;
                this.erro = null;
                return usuarioAtualizado;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        async deletar() {
            try {
                await service.deletar(this.usuario.id);
                this.usuario = null;
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        }
    }
});

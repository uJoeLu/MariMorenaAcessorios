import { defineStore } from "pinia";
import { EnderecoService } from "@/service/enderecoService";

const service = new EnderecoService();

export const useEnderecoStore = defineStore('endereco', {
    state: () => ({
        enderecos: [],
        erro: null
    }),
    actions: {
        async carregarEnderecos() {
            try {
                this.enderecos = await service.listarEnderecos();
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        async adicionarEndereco(endereco) {
            try {
                await service.adicionarEndereco(endereco);
                await this.carregarEnderecos();
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        async atualizarEndereco(id, dadosAtualizados) {
            try {
                await service.atualizarEndereco(id, dadosAtualizados);
                await this.carregarEnderecos();
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        async removerEndereco(id) {
            try {
                await service.removerEndereco(id);
                await this.carregarEnderecos();
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
        async definirEnderecoPrincipal(id) {
            try {
                await service.definirEnderecoPrincipal(id);
                await this.carregarEnderecos();
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        }
    }
});

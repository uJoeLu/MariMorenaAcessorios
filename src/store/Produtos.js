import { defineStore } from 'pinia';
import { ProdutoService } from '@/service/produtoService';

const service = new ProdutoService();

export const useProdutos = defineStore('produtos', {
    state: () => ({
        produtos: [],
        erro: null
    }),

    getters: {
        getProdutoById: (state) => (id) => {
            return state.produtos.find(produto => produto.id === id);
        },
        buscarPorCategoria: (state) => (categoria) => {
            return state.produtos.filter(produto => produto.categoria === categoria);
        },
    },

    actions: {
        async carregarProdutos() {
            try {
                this.produtos = await service.listarProdutos();
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async cadastrarProduto(novoProduto) {
            try {
                const produto = await service.cadastrar(novoProduto);
                this.produtos.push(produto);
                this.erro = null;
                return produto;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async atualizarProduto(id, dadosAtualizados) {
            try {
                const produtoAtualizado = await service.atualizar(id, dadosAtualizados);
                const index = this.produtos.findIndex(p => p.id === id);
                if (index !== -1) {
                    this.produtos[index] = produtoAtualizado;
                }
                this.erro = null;
                return produtoAtualizado;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async deletarProduto(id) {
            try {
                await service.deletar(id);
                this.produtos = this.produtos.filter(produto => produto.id !== id);
                this.erro = null;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async reduzirEstoque(id, quantidade) {
            try {
                const produtoAtualizado = await service.reduzirEstoque(id, quantidade);
                const index = this.produtos.findIndex(p => p.id === id);
                if (index !== -1) {
                    this.produtos[index] = produtoAtualizado;
                }
                this.erro = null;
                return produtoAtualizado;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },

        async aumentarEstoque(id, quantidade) {
            try {
                const produtoAtualizado = await service.aumentarEstoque(id, quantidade);
                const index = this.produtos.findIndex(p => p.id === id);
                if (index !== -1) {
                    this.produtos[index] = produtoAtualizado;
                }
                this.erro = null;
                return produtoAtualizado;
            } catch (error) {
                this.erro = error.message;
                throw error;
            }
        },
    }
});

<template>
    <div class="detalhe-produto-container">
        <router-link to="/">&lt; Voltar para o Catálogo</router-link>

        <div v-if="!produto">
            <p>Carregando detalhes do produto...</p>
        </div>

        <div v-else>
            <div>
                <h1>{{ produto.nome }}</h1>

                <img :src="produto.imagem" :alt="produto.nome" class="produto-imagem">
            </div>
            <div>
                <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>
                <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
                <p><strong>Categoria:</strong> {{ produto.categoria }}</p>
                <button @click="adicionarNaSacola(produto)" class="btn-adicionar-sacola">Adicionar à Sacola</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProdutos } from '@/composables/Produtos.js';
import { useSacola } from '@/composables/Sacola.js';
const { adicionarNaSacola } = useSacola();
const { produtos } = useProdutos();
const produto = ref(null);
const isLoading = ref(true);
const route = useRoute();
const produtoId = Number(route.params.id);

const fetchProdutoLocal = () => {
    isLoading.value = true;
    if (produtoId && !isNaN(produtoId)) {
        const produtoEncontrado = produtos.value.find(p => p.id === produtoId);
        produto.value = produtoEncontrado;
    } else {
        console.error("ID do produto inválido na rota.");
    }
    isLoading.value = false;
};

onMounted(() => {
    fetchProdutoLocal();
});
</script>
<style scoped></style>
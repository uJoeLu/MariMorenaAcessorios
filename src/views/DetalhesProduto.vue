<template>
    <div class="detalhe-produto-container">
        <router-link to="/">< Voltar para o Catálogo</router-link>

        <div v-if="!produto">
            <p>Carregando detalhes do produto...</p>
        </div>

        <div class="produto-detalhe" v-else>
            <div class="imagem-produto">
                <h1>{{ produto.nome }}</h1>

                <img :src="produto.imagem" :alt="produto.nome" class="produto-imagem">
            </div>
            <div class="detalhes-produto">
                <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>
                <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
                <p><strong>Categoria:</strong> {{ produto.categoria }}</p>
                <button @click="adicionarNaSacola(produto)" class="btn-adicionar-sacola">Adicionar à Sacola</button>
            </div>
        </div>
    </div>
    <div class="mais-opcoes">
        <CartaoProduto v-for="item in produtosOrdenados.filter(item => item.categoria ==  produto.categoria)" :key="item.id" :produto="item"/>
        </div>
        <div class="comentarios-section" v-if="produto">
            <h2>Comentários</h2>
            <form @submit.prevent="adicionarComentario">
                <textarea v-model="novoComentario" placeholder="Escreva seu comentário aqui..." rows="4" required></textarea>
                <button type="submit" class="btn-adicionar-comentario">Adicionar Comentário</button>
            </form>
            <div v-if="comentarios.length === 0">
                <p>Seja o primeiro a comentar este produto.</p>
            </div>
            <ul v-else class="lista-comentarios">
                <li v-for="comentario in comentarios" :key="comentario.id" class="comentario-item">
                    <p><strong>{{ comentario.usuario }}</strong> <em>({{ formatarData(comentario.data) }})</em></p>
                    <p>{{ comentario.texto }}</p>
                </li>
            </ul>
        </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProdutos } from '@/composable/Produtos.js';
import { useSacola } from '@/store/Sacola.js';
import CartaoProduto from '@/componentes/CartaoProduto.vue';
import { useFiltros } from '@/composable/Filtros';
import { useComentarios } from '@/store/Comentarios.js';

const { produtosOrdenados } = useFiltros();
const { adicionarNaSacola } = useSacola();
const { produtos } = useProdutos();
const produto = ref(null);
const isLoading = ref(true);
const route = useRoute();
const produtoId = Number(route.params.id);

const comentariosStore = useComentarios();
const comentarios = ref([]);
const novoComentario = ref('');

const fetchProdutoLocal = () => {
    isLoading.value = true;
    if (produtoId && !isNaN(produtoId)) {
        const produtoEncontrado = produtos.value.find(p => p.id === produtoId);
        produto.value = produtoEncontrado;
        comentarios.value = comentariosStore.getComentariosPorProduto(produtoId);
    } else {
        console.error("ID do produto inválido na rota.");
    }
    isLoading.value = false;
};

const adicionarComentario = () => {
    try {
        comentariosStore.adicionarComentario(produtoId, novoComentario.value);
        novoComentario.value = '';
        comentarios.value = comentariosStore.getComentariosPorProduto(produtoId);
    } catch (error) {
        alert(error.message);
    }
};

const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

onMounted(() => {
    fetchProdutoLocal();
});
</script>
<style scoped>
.detalhe-produto-container{
    display: flex;
    margin: auto;
    min-height: 100vh;
    flex-direction: column;
}
.produto-detalhe {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 50px;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
}

.produto-imagem {
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.imagem-produto {
    display: flex;
    width: 100%;
    max-width: 400px;
    margin: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    padding: 10px;
    background-color: #FEDE8B;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.detalhes-produto {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 10px;
    font-size: 18px;
    line-height: 1.6;
    padding: 10px;
    background-color: #FEDE8B;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}
.btn-adicionar-sacola {
    background-color: #FF6F61;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.btn-adicionar-sacola:hover {
    background-color: #e65b50;
}
a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}
a:hover {
    text-decoration: underline;
}
h1 {
    margin-top: 0;
}
p {
    font-size: 18px;
    line-height: 1.6;
}
strong {
    font-weight: bold;
}
.comentarios-section {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: #FEDE8B;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.lista-comentarios {
    list-style: none;
    padding: 0;
    margin-top: 10px;
}
.comentario-item {
    background-color: white;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
textarea {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    resize: vertical;
    font-size: 16px;
    margin-bottom: 10px;
}
.btn-adicionar-comentario {
    background-color: #FF6F61;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.btn-adicionar-comentario:hover {
    background-color: #e65b50;
}

@media (max-width: 768px) {
    .produto-detalhe {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 10px;
    }

    .imagem-produto {
        max-width: 100%;
    }

    .detalhes-produto {
        text-align: center;
    }
}
</style>

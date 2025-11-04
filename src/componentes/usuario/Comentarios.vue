<template>
    <div class="comentario-container">
        <h2>Comentários do Usuário</h2>
        <div>
            <div v-if="!comentarios" class="sem-comentarios">
                <p>Você ainda não fez nenhum comentário.</p>
            </div>
            <div v-else class="comentarios-lista">
                <div v-for="comentario in comentarios" :key="comentario.id" class="comentario-card ">
                    <div>
                        <router-link :to="`/detalhes/${comentario.produtoId}`">
                            <img :src="getProduto(comentario.produtoId).imagem" :alt="comentario.produto" class="produto-imagem" />
                        </router-link>
                    </div>
                    <div>
                        <h3>{{getProduto(comentario.produtoId).nome }}</h3>
                        <p><strong>Data:</strong> {{ new Date(comentario.data).toLocaleDateString('pt-BR') }}</p>
                        <p><strong>Avaliação:</strong> {{ comentario.avaliacao }} / 5</p>
                        <p><strong>Comentário:</strong> {{ comentario.texto }}</p>
                    </div>
                    <button @click="comentariosStore.removerComentario(comentario.id)">Excluir Comentário</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useComentarios } from '@/store/Comentarios.js';
import { useProdutos } from '@/store/Produtos.js';

const comentariosStore = useComentarios();
const comentarios = comentariosStore.comentarios;

const produtosStore = useProdutos();

const getProduto = (produtoId) => {
  const produto = produtosStore.getProdutoById(produtoId);
  return produto ? produto : '';
};
</script>

<style scoped>
.comentario-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.comentario-card {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    align-items: center;
    gap: 15px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.comentario-card button {
    background-color: #ff4d4f;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.produto-imagem {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}
</style>

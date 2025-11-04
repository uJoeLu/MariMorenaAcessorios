<template>
    <div class="comentario-container">
        <h2>Comentários do Usuário</h2>
        <div>
            <div v-if="!comentarios" class="sem-comentarios">
                <p>Você ainda não fez nenhum comentário.</p>
            </div>
            <div v-else class="comentarios-lista">
                <div v-for="comentario in comentarios" :key="comentario.id" class="comentario-card">
                    <h3>Comentário sobre {{ comentario.produto }}</h3>
                    <p><strong>Data:</strong> {{ new Date(comentario.data).toLocaleDateString('pt-BR') }}</p>
                    <p><strong>Avaliação:</strong> {{ comentario.avaliacao }} / 5</p>
                    <p><strong>Comentário:</strong> {{ comentario.texto }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useComentarios } from '@/store/Comentarios.js';

const comentariosStore = useComentarios();
const comentarios = comentariosStore.comentarios;

</script>

<style scoped>
.comentario-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

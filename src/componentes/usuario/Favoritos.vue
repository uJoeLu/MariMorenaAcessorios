<template>
    <div class="favoritos-container">
        <h2>Meus Favoritos</h2>
        <div class="itens-favoritados">
        <div class="item-favorito" v-if="storeFavoritos.favoritos.length > 0 ">
            <div v-for="favorito in storeFavoritos.favoritos" :key="favorito.id" class="item">
                <img :src="favorito.imagem" />
                <div class="text">
                    <p> {{ favorito.nome }}</p>
                    <p>{{ favorito.descricao }}</p>
                    <p>R$ {{ parseFloat(favorito.preco).toFixed(2) }}</p> 
                </div>
                
                <button @click="() => storeFavoritos.removerFavorito(favorito.id)"> 
                    remover 
                </button>
            </div>
        </div>
            <div v-else>
                <h2>
                    Não há itens favoritados
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFavoritos } from '@/store/Favoritos';
import { onMounted } from 'vue';
const storeFavoritos = useFavoritos();
onMounted(() => {
    storeFavoritos.loadFavoritos();
});

</script>

<style scoped>
.favoritos-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.itens-favoritados {
    display: flex;
    flex-direction: column;
    background-color: #D9D9D905;
}
.item-favorito {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.item {
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.1fr;
    margin: 10px 0 10px;
}

.item img {
    width: 100px;
    margin: auto;

}
button {
    background-color: #FF6F61;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    align-self: center;
}
</style>

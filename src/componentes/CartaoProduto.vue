<template>
  <div class="cartao">
    <div class="imagem-container">
      <router-link :to="'/detalhes/' + produto.id"><img :src="produto.imagem" :alt="produto.nome" /></router-link>
      <button class="favorito-btn" @click="toggleFavorito(produto)" :class="{ 'favoritado': isFavorito(produto.id) }">
        ♥
      </button>
    </div>

    <h3>{{ produto.nome }}</h3>
    <p>R$ {{ produto.preco }}</p>

    <button @click="adicionarNaSacola(produto)" >
      Adicionar à sacola
    </button>
  </div>
</template>

<script setup>
import { useSacola } from '@/store/Sacola.js';
import { useFavoritos } from '@/store/Favoritos.js';

const { adicionarNaSacola } = useSacola();
const { toggleFavorito, isFavorito } = useFavoritos();

const props = defineProps(
  {
  produto: {
    type: Object,
    required: true
  }
}
);
</script>
<style scoped>
.cartao {
  display: block;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s;
}
.cartao:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.cartao img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 12px;
}
.cartao h3 {
  font-size: 1.2rem;
  margin: 8px 0;
  color: #FEDE8B;
}
.cartao p {
  font-size: 1rem;
  color: #FEDE8B;
  margin-bottom: 16px;
}
.cartao button {
  background-color: #FEDE8B;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.cartao button:hover {
  background-color: #e6c76b;
}

.imagem-container {
  position: relative;
  display: inline-block;
}

.favorito-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.favorito-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.favorito-btn.favoritado {
  color: red;
}
</style>

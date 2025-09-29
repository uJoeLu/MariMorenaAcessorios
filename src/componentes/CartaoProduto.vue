<template>
  <div class= "cartao">
    <img :src="produto.imagem" :alt="produto.nome" />

    <h3>{{ produto.nome }}</h3>
    <p>R$ {{ produto.preco }}</p>
    <p>{{ produto.quantidade }}</p>

    <button @click="$emit('adicionar-a-sacola', produto)" >
      Adicionar à sacola
    </button>
  </div>
</template>

<script setup>
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
</style>
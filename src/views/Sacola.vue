<template>
    <div class="sacola-container">
        <h1>Minha Sacola</h1>

        <div v-if="sacola.length === 0" class="sacola-vazia">
            <p>Sua sacola está vazia. Adicione alguns acessórios lindos!</p>
            <router-link to="/" class="btn-voltar">Voltar ao Catálogo</router-link>
        </div>

        <div v-else>
            <div v-for="item in sacola" :key="item.id" class="item-sacola">
                <div class="imagem-container">
                <img :src="item.imagem" :alt="item.nome" class="item-imagem">
                </div>
                <div class="item-detalhes">
                    <h3>{{ item.nome }}</h3>
                    <p>Preço unitário: R$ {{ item.preco.toFixed(2) }}</p>
                    <p>Quantidade: {{ item.quantidade }}</p>
                    <p>Subtotal: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
                    <button @click="diminuirQtd(item.id)" class="btn-remover">Remover</button>
                </div>
            </div>
            <div class="cep">
                <h3>Calcular Frete</h3>
                <input type="text" placeholder="Digite seu CEP" />
                <button class="btn-calcular">Calcular</button>
            </div>

            <div class="sacola-resumo">
                <h2>Total da Compra: R$ {{ totalSacola.toFixed(2) }}</h2>
                <button class="btn-checkout">Finalizar Compra</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSacola } from '@/composables/Sacola.js';

const { sacola, diminuirQtd } = useSacola();

const totalSacola = computed(() => {
    return sacola.value.reduce((total, item) => total + (item.preco * item.quantidade), 0);
});
</script>
<style scoped>
.sacola-container {
    width: 40%;
    margin: 20px auto;
    padding: 20px;
    background-color:#FEDE8B;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.sacola-vazia {
    text-align: center;
    margin-top: 50px;
}
.btn-voltar {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #BFAF8F;
    color: #000000;
    text-decoration: none;
    border-radius: 5px;
}
.btn-voltar:hover {
    background-color: #e6c76b;
}
.cep {
    margin-top: 20px;
}
.cep input {
    padding: 8px;
    width: 200px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.cep .btn-calcular {
    padding: 8px 16px;
    background-color: #BFAF8F;
    color: #000000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.cep .btn-calcular:hover {
    background-color: #e6c76b;
}
.item-sacola {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000000;
    padding: 15px 0;
}
.imagem-container {
    flex: 0 0 150px;
    margin-right: 20px;
}
.item-imagem {
    max-width: 100%;
    border-radius: 8px;
}
.item-detalhes {
    flex: 1;
}
.item-detalhes h3 {
    margin: 0 0 10px;
}
.item-detalhes p {
    margin: 5px 0;
}
.btn-remover {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.btn-remover:hover {
    background-color: #e04343;
}
.sacola-resumo {
    text-align: right;
    margin-top: 20px;
}
.btn-checkout {
    padding: 12px 24px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.btn-checkout:hover {
    background-color: #218838;
}
.item-sacola:last-child {
    border-bottom: none;
}
.item-sacola {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
}
.item-detalhes {
    flex: 1;
    margin-left: 20px;
}
.item-detalhes h3 {
    margin: 0 0 10px;
}
.item-detalhes p {
    margin: 5px 0;
}
.btn-remover {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.btn-remover:hover {
    background-color: #e04343;
}
.sacola-resumo {
    text-align: right;
    margin-top: 20px;
}
.btn-checkout {
    padding: 12px 24px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.btn-checkout:hover {
    background-color: #218838;
}
.item-sacola:last-child {
    border-bottom: none;
}

</style>
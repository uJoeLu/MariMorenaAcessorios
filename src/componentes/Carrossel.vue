<template>
    <div class="carrossel">
        <button @click="prev()" class="carrossel-btn left">&#10094;</button>
        
        <div class="carrossel-slides">
            <img :src="images[current]" alt="Slide" class="carrossel-img" /> 
        </div>
        
        <button @click="next()" class="carrossel-btn right">&#10095;</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
    'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756824425.5975.jpg',
    'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756993451.3086.jpeg',
    'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756824425.7439.jpg',
    'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756993451.5092.jpg',
]);
const current = ref(0);

function next() {
    current.value = (current.value + 1) % images.value.length;
}

function prev() {
    current.value = (current.value - 1 + images.value.length) % images.value.length;
}
</script>

<style scoped>
.carrossel {
    background-color: #BFAF8F;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; 
    height: 500px;
    margin: 0; 
    padding: 0;
}

.carrossel-slides {
    width: 100%; 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carrossel-img {
    max-width: 100%; 
    height: 100%;
    margin: 0;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.carrossel-btn {
    width: 60px;
    background: rgba(0,0,0,0.5);
    color: #BFAF8F;
    border: none;
    border-radius: 100%;
    font-size: 3rem;
    position: absolute;
    top: 300px;


}
.carrossel-btn.left {
    left: 15px;
}
.carrossel-btn.right {
    right: 15px;
    }
</style>
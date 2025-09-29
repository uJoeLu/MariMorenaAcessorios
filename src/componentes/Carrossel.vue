<template>
    <div class="carrossel">
        <button @click="prev" class="carrossel-btn left">&#10094;</button>
        
        <div class="carrossel-slides">
            <img :src="images[current]" alt="Slide" class="carrossel-img" /> 
        </div>
        
        <button @click="next" class="carrossel-btn right">&#10095;</button>
    </div>
</template>

<script>
export default {
    name: 'Carrossel',
    data() {
        return {
            images: [
                'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756824425.5975.jpg',
                'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756993451.3086.jpeg',
                'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756824425.7439.jpg',
                'https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-argola-dupla-texturizada-m-1756993451.5092.jpg',
            ],
            current: 0
        };
    },
    methods: {
        next() {
            this.current = (this.current + 1) % this.images.length;
        },
        prev() {
            this.current = (this.current - 1 + this.images.length) % this.images.length;
        }
    }
};
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
    padding: auto;
    position: absolute;
    top: 300px

}
.carrossel-btn.left {
    left: 15px;
}
.carrossel-btn.right {
    right: 15px;
}
</style>
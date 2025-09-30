<template>
    
    <body>
        <div class="car">
            <Carrossel />
        </div>
        <h1 class="text-2xl font-bold mb-4">Catálogo</h1>
        <div class="cartoes-produtos">
            <CartaoProduto v-for="item in produtos" :key="item.id" :produto="item"
                @adicionar-a-sacola="adicionarNaSacola" />
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in sacola" :key="index">
                    {{ item.nome }} - R$ {{ item.preco }}
                </li>
            </ul>
        </div>
    </body>
</template>
<script setup>
import { ref } from 'vue';
import Carrossel from '@/componentes/Carrossel.vue';
import CartaoProduto from '@/componentes/CartaoProduto.vue';

const produtos = ref([
    { id: 1, nome: "Brinco Dourado", preco: 25,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-gota-vazada-1757365878.3214.jpg" },
    { id: 2, nome: "Colar de Pérolas", preco: 40,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/colar-triplo-folheado-a-ouro-18k-e-prata-perolas--esferas-e-placas-circulares-1757446852.4441.jpg" },
    { id: 3, nome: "Pulseira Dourada", preco: 30,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-aro-folheado-a-prata-dois-fios-duplos-1758060165.6218.jpg" },
    { id: 4, nome: "Pulseira de Cobre", preco: 30,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-aro-folheado-a-prata-dois-fios-duplos-1758060165.6218.jpg" },
    { id: 5, nome: "Pulseira com Zirconio", preco: 30,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-aro-folheado-a-prata-dois-fios-duplos-1758060165.6218.jpg" },
    { id: 6, nome: "Pulseira de Aço", preco: 30,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-aro-folheado-a-prata-dois-fios-duplos-1758060165.6218.jpg" },
    { id: 7, nome: "Anel de Prata", preco: 20,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/anel-folheado-a-ouro-18k-e-prata-enrolado-1754996511.9469.jpg" },
    { id: 8, nome: "Anel Dourado", preco: 20,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/anel-folheado-a-ouro-18k-e-prata-vazado-1754396541.4854.jpg" },
    { id: 9, nome: "Anel de gatinho e coração", preco: 30,quantidade: 10, imagem: "https://febijus.bwimg.com.br/febijus/produtos/anel-semi-joia-gatinho-e-coracao-com-ponto-de-luz-1744760268.3022.jpg" }
]);
const sacola = ref([]);

function adicionarNaSacola(produto) {
    sacola.value.push(produto);
    console.log(sacola.value);
}
</script>
<style scoped>
body{
    margin: 0;
    padding: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.car {
    display: flex;
    top: 0;
    left: 100%;
    right: 100%;
}

.cartoes-produtos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    justify-items: center;
    align-items: center;
    margin-bottom: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 40px;

}

h1 {
    text-align: center;
    margin-top: 20px;
}
</style>
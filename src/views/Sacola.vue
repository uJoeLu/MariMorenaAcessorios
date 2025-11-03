<template>
    <div class="sacola-container">
        <h1>Minha Sacola</h1>

        <div v-if="sacolaStore.sacola.length < 1  " class="sacola-vazia">
            <p>Sua sacola está vazia. Adicione alguns acessórios lindos!</p>
            <router-link to="/" class="btn-voltar">Voltar ao Catálogo</router-link>
        </div>

        <div v-else>
            <div v-for="item in sacolaStore.sacola" :key="item.id" class="item-sacola">
                <div class="imagem-container">
                <img :src="item.imagem" :alt="item.nome" class="item-imagem">
                </div>
                <div class="item-detalhes">
                    <h3>{{ item.nome }}</h3>
                    <p>Preço unitário: R$ {{ item.preco.toFixed(2) }}</p>
                    <div class="quantidade-controle">
                        <button @click="diminuirQtd(item.id)" class="btn-quantidade">-</button>
                        <span>Quantidade: {{ item.quantidade }}</span>
                        <button @click="aumentarQtd(item.id)" class="btn-quantidade">+</button>
                    </div>
                    <p>Subtotal: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
                    <button @click="removerItem(item.id)" class="btn-remover">Remover Item</button>
                </div>
            </div>
            <div class="cep">
                <h3>Calcular Frete</h3>
                <input type="text" v-model="cep" placeholder="Digite seu CEP" />
                <button class="btn-calcular" @click="calcularFrete">Calcular</button>
                <p v-if="frete !== null">Frete estimado: R$ {{ frete.toFixed(2) }}</p>
                <p v-if="erroCep" class="erro-cep">{{ erroCep }}</p>
            </div>

            <div class="sacola-resumo">
                <h2>Total da Compra: R$ {{ (sacolaStore.totalPreco + frete).toFixed(2)}}</h2>
                <button @click="logado" class="btn-checkout" ><router-link to="/finalizar-compra"  > Finalizar Compra </router-link></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSacola } from '@/store/Sacola.js';
import { ref, onMounted } from 'vue';
import { getUsuarioLogado } from '@/service/autenticacao';
import router from '@/router';

const { aumentarQtd, diminuirQtd, removerItem } = useSacola();
const sacolaStore = useSacola();

const cep = ref('');
const frete = ref(null);
const erroCep = ref('');
function logado() {
    if (!getUsuarioLogado()) {
        router.push('/login');
        alert('Por favor, faça login para finalizar a compra.');
    }
}

function calcularFrete() {
  erroCep.value = '';
  frete.value = null;
  const cepValido = /^[0-9]{5}-?[0-9]{3}$/.test(cep.value);
  if (!cepValido) {
    erroCep.value = 'CEP inválido. Por favor, insira um CEP no formato 00000-000 ou 00000000.';
    return 0;
  }
  frete.value = 15.00;
}
onMounted(() => {
    sacolaStore.loadSacola();
});

</script>
<style scoped>

.sacola-container {
    width: 50%;
    margin: 20px auto;
    padding: 20px;
    background-color:#FEDE8B;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20% ;
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
.quantidade-controle {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
}
.btn-quantidade {
    padding: 5px 10px;
    background-color: #BFAF8F;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}
.btn-quantidade:hover {
    background-color: #e6c76b;
}
.item-sacola:last-child {
    border-bottom: none;
}

@media (max-width: 768px) {
    .sacola-container {
        width: 90%;
        margin: 10px auto;
        padding: 15px;
    }

    .item-sacola {
        flex-direction: column;
        align-items: flex-start;
    }

    .imagem-container {
        flex: none;
        margin-right: 0;
        margin-bottom: 10px;
        align-self: center;
    }

    .cep input {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
    }

    .cep .btn-calcular {
        width: 100%;
    }

    .sacola-resumo {
        text-align: center;
    }
}
</style>

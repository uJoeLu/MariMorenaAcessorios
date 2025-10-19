<template>
  <div class="content">
    <router-link to="/" tag="button" class="btn-cancelar"> Cancelar </router-link>
    <EnderecoStep @selecione-endereco="SelecionarEndereco" />

    <PagamentoStep @select-payment="SelecionarPagamento" />

    <div class="resumo-pedido" v-if="pedido.endereco && pedido.formaPagamento">
      <h2>Resumo do Pedido</h2>
      <div v-for="item in sacola" :key="item.id" class="item-resumo">
        <p>{{ item.nome }} - Quantidade: {{ item.quantidade }} - Preço: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
      </div>
      <p class="total">Total: R$ {{ totalPreco.toFixed(2) }}</p>
      <p>Endereço: {{ pedido.endereco.endereco }}, {{ pedido.endereco.bairro }} - {{ pedido.endereco.cep }}, {{ pedido.endereco.cidade }} - {{ pedido.endereco.estado }}</p>
      <p>Pagamento: {{ pedido.formaPagamento === 'pix' ? 'Pix' : pedido.formaPagamento === 'boleto' ? 'Boleto' : 'Cartão de Crédito' }}</p>
      <button @click="confirmado = true" class="btn-finalizar">Finalizar Pedido</button>
    </div>

    <ConfirmacaoStep v-if="confirmado" :pedido="pedido" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EnderecoStep from './EnderecoStep.vue';
import PagamentoStep from './PagamentoStep.vue';
import ConfirmacaoStep from './ConfirmacaoStep.vue';
import { useSacola } from '@/store/Sacola.js';

const { sacola, totalPreco } = useSacola();

const pedido = ref({
  endereco: null,
  formaPagamento: '',
});

const confirmado = ref(false);

const SelecionarEndereco = (endereco) => {
  pedido.value.endereco = endereco;
};

const SelecionarPagamento = (formaPagamento) => {
  pedido.value.formaPagamento = formaPagamento;
};
</script>
<style scoped>
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.btn-cancelar {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: black;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 1em;
}

.btn-cancelar:hover {
  background-color: #e0e0e0;
}

.resumo-pedido {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.item-resumo {
  margin-bottom: 10px;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
  margin: 10px 0;
}

.btn-finalizar {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.btn-finalizar:hover {
  background-color: #45a049;
}
</style>

<template>
  <div>
    <h2>Selecione a Forma de Pagamento</h2>

    <div class="pagamento-opcoes">
      <div class="opcao" @click="selecionarPagamento('pix')">
        <input type="radio" id="pix" value="pix" v-model="formaPagamento" />
        <label for="pix">Pix</label>
      </div>
      <div class="opcao" @click="selecionarPagamento('boleto')">
        <input type="radio" id="boleto" value="boleto" v-model="formaPagamento" />
        <label for="boleto">Boleto</label>
      </div>
      <div class="opcao" @click="selecionarPagamento('cartao')">
        <input type="radio" id="cartao" value="cartao" v-model="formaPagamento" />
        <label for="cartao">Cartão de Crédito</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['select-payment', 'prev-step']);

const formaPagamento = ref('');

const selecionarPagamento = (tipo) => {
  formaPagamento.value = tipo;
};

const confirmarPagamento = () => {
  if (formaPagamento.value) {
    emit('select-payment', formaPagamento.value);
  }
};
</script>

<style scoped>
.pagamento-opcoes {
  margin-bottom: 20px;
}
.opcao {
  margin-bottom: 10px;
  cursor: pointer;
}
.opcao:hover {
  background-color: #f0f0f0;
}
</style>

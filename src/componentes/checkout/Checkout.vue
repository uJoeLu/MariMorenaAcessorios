<template>
  <div class="content">
    <!-- Botão de Cancelar -->
    <router-link to="/" tag="button" class="btn-cancelar">Cancelar</router-link>

    <!-- Etapa 1: Selecionar Endereço -->
    <div v-if="currentStep === 1">
      <section class="checkout-section">
        <EnderecoStep @selecione-endereco="SelecionarEndereco" />
      </section>
    </div>

    <!-- Etapa 2: Selecionar Pagamento -->
    <div v-if="currentStep === 2">
      <section class="checkout-section">
        <PagamentoStep @select-payment="SelecionarPagamento" />
      </section>
      <button @click="currentStep = 1" class="btn-voltar">Voltar</button>
    </div>

    <!-- Etapa 3: Resumo do Pedido -->
    <div v-if="currentStep === 3" class="resumo-pedido">
      <h2>Resumo do Pedido</h2>
      <div class="itens-pedido">
        <div v-for="item in sacola" :key="item.id" class="item-resumo">
          <p>{{ item.nome }} - Quantidade: {{ item.quantidade }} - Preço: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
        </div>
      </div>
      <p class="total">Total: R$ {{ totalPreco.toFixed(2) }}</p>
      <div class="detalhes-pedido">
        <p>Endereço: {{ pedido.endereco.endereco }}, {{ pedido.endereco.bairro }} - {{ pedido.endereco.cep }}, {{ pedido.endereco.cidade }} - {{ pedido.endereco.estado }}</p>
        <p>Pagamento: {{ pedido.formaPagamento === 'pix' ? 'Pix' : pedido.formaPagamento === 'boleto' ? 'Boleto' : 'Cartão de Crédito' }}</p>
      </div>
      <button @click="currentStep = 2" class="btn-voltar">Voltar</button>
      <button @click="finalizarPedido" class="btn-finalizar">Finalizar Pedido</button>
    </div>

    <!-- Etapa 4: Confirmação -->
    <div v-if="currentStep === 4">
      <ConfirmacaoStep :pedido="pedido" :total="totalPreco" />
      <button @click="$router.push('/')" class="btn-cancelar">Voltar à Loja</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EnderecoStep from './EnderecoStep.vue';
import PagamentoStep from './PagamentoStep.vue';
import ConfirmacaoStep from './ConfirmacaoStep.vue';
import { useSacola } from '@/store/Sacola.js';

const sacolaStore = useSacola();
const { sacola, totalPreco } = sacolaStore;

const currentStep = ref(1);

const pedido = ref({
  endereco: null,
  formaPagamento: '',
});

const SelecionarEndereco = (endereco) => {
  pedido.value.endereco = endereco;
  currentStep.value = 2;
};

const SelecionarPagamento = (formaPagamento) => {
  pedido.value.formaPagamento = formaPagamento;
  currentStep.value = 3;
};

const finalizarPedido = () => {
  currentStep.value = 4;
  sacolaStore.limparSacola();
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

.checkout-section {
  margin-bottom: 30px;
}

.resumo-pedido {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.itens-pedido {
  margin-bottom: 15px;
}

.item-resumo {
  margin-bottom: 10px;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
  margin: 10px 0;
}

.detalhes-pedido {
  margin-bottom: 20px;
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

.btn-voltar {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 10px;
}

.btn-voltar:hover {
  background-color: #e0e0e0;
}
</style>

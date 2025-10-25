<template>
  <div class="content">
    <h2>Selecione o Endereço de Entrega</h2>

    <div class="enderecos-lista">
      <div v-for="endereco in enderecos" :key="endereco.id" class="endereco-item" @click="selecionarEndereco(endereco)">
        <p>{{ endereco.endereco }}, {{ endereco.bairro }} - {{ endereco.cep }}, {{ endereco.cidade }} - {{
          endereco.estado }}</p>
      </div>
    </div>
    <button @click="shownovoEnderecoForm = !shownovoEnderecoForm">
      Adicionar Novo Endereço
    </button>
    <div v-if="shownovoEnderecoForm" @submit.prevent="AddnovoEndereco">
      <h3>Novo Endereço</h3>
      <form>
        <input type="text" placeholder="Endereço" required v-model="novoEndereco.endereco" />
        <input type="text" placeholder="Bairro" required v-model="novoEndereco.bairro" />
        <input type="text" placeholder="Cep" required v-model="novoEndereco.cep" />
        <input type="text" placeholder="Cidade" required v-model="novoEndereco.cidade" />
        <input type="text" placeholder="Estado" required v-model="novoEndereco.estado" />
        <button type="submit">Salvar e Usar Endereço</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getUsuarioLogado } from '@/service/autenticacao';

const emit = defineEmits(['selecione-endereco']);

const usuario = getUsuarioLogado();

const enderecos = ref([]);

if (usuario && usuario.endereco) {
  enderecos.value = [{
    endereco: usuario.endereco,
    bairro: usuario.bairro,
    cep: usuario.cep,
    cidade: usuario.cidade,
    estado: usuario.estado,
    id: 'default'
  }];
}

const shownovoEnderecoForm = ref(false);

const novoEndereco = reactive({
  endereco: '',
  bairro: '',
  cep: '',
  cidade: '',
  estado: ''
});

const selecionarEndereco = (endereco) => {
  emit('selecione-endereco', endereco);
};

const AddnovoEndereco = () => {
  const novo = { ...novoEndereco, id: Date.now() };
  enderecos.value.push(novo);
  emit('selecione-endereco', novo);
};
</script>

<style scoped>
.endereco-item {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  cursor: pointer;
}

.endereco-item:hover {
  background-color: #f0f0f0;
}

.content form {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
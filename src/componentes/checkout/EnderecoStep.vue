<template>
  <div class="content">
    <h2>Selecione o Endereço de Entrega</h2>

    <div class="enderecos-lista">
      <div v-for="endereco in enderecos" :key="endereco.id" class="endereco-item" @click="selecionarEndereco(endereco)">
        <p>{{ endereco.rua }}, {{ endereco.bairro }} - {{ endereco.cep }}, {{ endereco.cidade }} - {{
          endereco.estado }}</p>
      </div>
    </div>
    
    <button @click="shownovoEnderecoForm = !shownovoEnderecoForm">
      {{ shownovoEnderecoForm ? 'Cancelar' : 'Adicionar Novo Endereço' }}
    </button>
    
    <div v-if="shownovoEnderecoForm">
      <h3>Novo Endereço</h3>
      <form @submit.prevent="AddnovoEndereco">
        <input type="text" placeholder="Rua" required v-model="novoEndereco.rua" />
        <input type="text" placeholder="Bairro" required v-model="novoEndereco.bairro" />
        <input type="text" placeholder="Cep" required v-model="novoEndereco.cep" @blur="validarCep" /> <button type="button" @click="validarCep" :disabled="loading">Validar CEP</button>
        <p v-if="erro" class="error">{{ erro }}</p>
        
        <input type="text" placeholder="Cidade" required v-model="novoEndereco.cidade" disabled />
        <input type="text" placeholder="Estado" required v-model="novoEndereco.estado" disabled />
        
        <button type="submit" :disabled="loading">Salvar e Usar Endereço</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getUsuarioLogado, adicionarEndereco } from '@/service/autenticacao'; // Adicionei adicionarEndereco
import { useCepApi } from '@/composable/useCepApi';

const emit = defineEmits(['selecione-endereco']);

// Desestrutura o Composable
const { buscarEndereco, loading, erro } = useCepApi();

const usuario = getUsuarioLogado();

const enderecos = ref([]);

if (usuario && usuario.rua) { // Verificação corrigida para 'usuario.rua' ou a chave correta
  enderecos.value = [{
    rua: usuario.rua,
    bairro: usuario.bairro,
    cep: usuario.cep,
    cidade: usuario.cidade,
    estado: usuario.estado,
    id: usuario.id || crypto.randomUUID(),
  }];
} 
if (usuario && usuario.enderecos && Array.isArray(usuario.enderecos)) {
    enderecos.value = usuario.enderecos.map(end => ({
        rua: end.rua,
        bairro: end.bairro,
        cep: end.cep,
        cidade: end.cidade,
        estado: end.estado,
        id: end.id || crypto.randomUUID(),
    }));
}


const shownovoEnderecoForm = ref(false);

const novoEndereco = reactive({
  rua: '', 
  bairro: '',
  cep: '',
  cidade: '',
  estado: ''
});

const selecionarEndereco = (endereco) => {
  emit('selecione-endereco', endereco);
};

const AddnovoEndereco = () => {
  const novo = { 
    ...novoEndereco, 
    id: crypto.randomUUID()
  };
  // Salva o novo endereço no backend
  adicionarEndereco(novo);

  enderecos.value.push(novo);
  
  // Limpa o formulário após salvar
  Object.assign(novoEndereco, {
    rua: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: ''
  });
  shownovoEnderecoForm.value = false;
  
  emit('selecione-endereco', novo);
};

// 🔑 REFACTOR: Adicionando tratamento de erro e feedback visual
async function validarCep() {
  // Limpar campos de feedback antes da busca
  novoEndereco.cidade = '';
  novoEndereco.estado = '';
  
  try {
    // Usa o CEP do objeto reativo local
    const endereco = await buscarEndereco(novoEndereco.cep);
    
    // O Composable retorna {cidade, estado} e atualizamos o objeto local
    novoEndereco.cidade = endereco.cidade;
    novoEndereco.estado = endereco.estado;
    
  } catch (e) {
    // O erro já está na ref `erro` do Composable, que será exibida no template
    console.error("Falha ao validar CEP:", e.message);
  }
}
</script>

<style scoped>
/* Seu estilo permanece o mesmo */
.endereco-item {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  cursor: pointer;
}

.endereco-item:hover {
  background-color: #f0f0f0;
}

/* 🔑 Corrigido: Estilo para exibir mensagem de erro */
.error {
    color: red;
    grid-column: 1 / 3; /* Para ocupar toda a largura em um grid de 2 colunas */
    margin-top: -10px;
}

.content form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px; /* Adiciona espaçamento entre os inputs */
}

/* Ajusta inputs que não devem ser divididos (ex: CEP e botão) */
.content form input:nth-child(3) { 
    grid-column: 1 / 2;
}
.content form button:nth-child(4) { 
    grid-column: 2 / 3;
}
</style>
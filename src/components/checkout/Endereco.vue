<template>
  <div class="endereco">
    <h2>Selecionar Endereço de Entrega</h2>

    <form @submit.prevent="salvarEndereco" class="endereco-form">
      <div class="form-group">
        <label for="cep">CEP:</label>
          <input type="text" id="cep" v-model="endereco.cep" @input="buscarCep" maxlength="8" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="rua">Rua:</label>
          <input type="text" id="rua" v-model="endereco.rua" placeholder="Nome da rua" />
        </div>
        <div class="form-group">
          <label for="numero">Número:</label>
          <input type="text" id="numero" v-model="endereco.numero" placeholder="123" />
        </div>
      </div>
      <div class="form-group">
        <label for="complemento">Complemento:</label>
        <input type="text" id="complemento" v-model="endereco.complemento"
          placeholder="Apartamento, bloco, etc." />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="bairro">Bairro:</label>
          <input type="text" id="bairro" v-model="endereco.bairro" placeholder="Nome do bairro" />
        </div>
        <div class="form-group">
          <label for="cidade">Cidade:</label>
          <input type="text" id="cidade" v-model="endereco.cidade" placeholder="Nome da cidade" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="estado">Estado:</label>
          <select id="estado" v-model="endereco.estado">
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        <div class="form-group">
          <label for="pais">País:</label>
          <input type="text" id="pais" v-model="endereco.pais" value="Brasil" readonly />
        </div>
      </div>

      <div class="form-actions">
        <router-link to="/sacola" class="btn-voltar">Voltar para Sacola</router-link>
        <button type="submit" class="btn-proximo">Próximo</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { authService } from '@/services/authService';
import { usuarioService } from '@/services/usuarioService';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, minLength, maxLength } from '@vuelidate/validators';

const user = computed(() => authService.getCurrentUser());


const router = useRouter();
const checkoutStore = useCheckoutStore();

const endereco = ref({
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  pais: 'Brasil'
});

const rules = computed(() => ({
  endereco: {
    cep: { required, numeric, minLength: minLength(8), maxLength: maxLength(8) },
    rua: { required, minLength: minLength(3) },
    numero: { required, numeric, minLength: minLength(1), maxLength: maxLength(5) },
    bairro: { required, minLength: minLength(2) },
    cidade: { required, minLength: minLength(2) },
    estado: { required }
  }
}));

const v$ = useVuelidate(rules, { endereco });

onMounted(async () => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) {
    return;
  }

  try {
    const data = await usuarioService.buscarPorId(currentUser.uid);
    if (data.endereco) {
      endereco.value = { ...endereco.value, ...data.endereco };
    }
  } catch (err) {
    console.error("Erro ao carregar dados do usuário:", err);
  }
});




const buscarCep = async () => {
  if (endereco.value.cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${endereco.value.cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        endereco.value.rua = data.logradouro;
        endereco.value.bairro = data.bairro;
        endereco.value.cidade = data.localidade;
        endereco.value.estado = data.uf;
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  }
};

const salvarEndereco = () => {
  checkoutStore.setEndereco({ ...endereco.value });
  router.push('/checkout/pagamento');
};
</script>

<style scoped>
.endereco {
  max-width: 600px;
  margin: 0 auto;
}

.endereco h2 {
  color: #1a1a1a;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
}

.endereco-salvo {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
}

.endereco-salvo h3 {
  color: #1a1a1a;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.endereco-salvo p {
  margin: 0.5rem 0;
  color: #666666;
}

.btn-usar {
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  background-color: #d4af37;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-usar:hover {
  background-color: #c49b2a;
}

.endereco-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #1a1a1a;
}

.form-group input,
.form-group select {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #d4af37;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-voltar {
  padding: 0.8rem 2rem;
  background-color: transparent;
  color: #666666;
  text-decoration: none;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-voltar:hover {
  background-color: #f5f5f5;
  border-color: #cccccc;
}

.btn-proximo {
  padding: 0.8rem 2rem;
  background-color: #d4af37;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-proximo:hover {
  background-color: #c49b2a;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

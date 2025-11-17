<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Cadastrar-se</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="displayName">Nome:</label>
          <input type="text" id="displayName" v-model="displayName" :class="{ 'is-invalid': v$.displayName.$error }"
            @blur="v$.displayName.$touch()"
            placeholder="Digite seu nome" />
          <div v-if="v$.displayName.$error" class="error-message">
            <div v-for="error in v$.displayName.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" :class="{ 'is-invalid': v$.email.$error }"
          @blur="v$.email.$touch()"  
          placeholder="Digite seu email" />
          <div v-if="v$.email.$error" class="error-message">
            <div v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" :class="{ 'is-invalid': v$.password.$error }"
          @blur="v$.password.$touch()"  
          placeholder="Digite sua senha (mín. 6 caracteres)" />
          <div v-if="v$.password.$error" class="error-message">
            <div v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input type="tel" id="telefone" v-model="telefone" :class="{ 'is-invalid': v$.telefone.$error }"
          @blur="v$.telefone.$touch()"  
          placeholder="Digite seu telefone" />
          <div v-if="v$.telefone.$error" class="error-message">
            <div v-for="error in v$.telefone.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <h3>Endereço</h3>
        <div class="form-group">
          <label for="cep">CEP:</label>
          <div class="cep-group">
            <input type="text" id="cep" v-model="endereco.cep" maxlength="8"
              :class="{ 'is-invalid': v$.endereco.cep.$error }" 
              @blur="v$.endereco.cep.$touch()"
              placeholder="Digite o CEP" />
            <button type="button" @click="buscarCep" :disabled="loading" class="btn-cep">Buscar CEP</button>
          </div>
          <div v-if="v$.endereco.cep.$error" class="error-message">
            <div v-for="error in v$.endereco.cep.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="rua">Rua:</label>
            <input type="text" id="rua" v-model="endereco.rua" :class="{ 'is-invalid': v$.endereco.rua.$error }"
            @blur="v$.endereco.rua.$touch()"  
            placeholder="Nome da rua" />
            <div v-if="v$.endereco.rua.$error" class="error-message">
              <div v-for="error in v$.endereco.rua.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="numero">Número:</label>
            <input type="text" id="numero" v-model="endereco.numero" maxlength="5" :class="{ 'is-invalid': v$.endereco.numero.$error }"
            @blur="v$.endereco.numero.$touch()"  
            placeholder="123" />
            <div v-if="v$.endereco.numero.$error" class="error-message">
              <div v-for="error in v$.endereco.numero.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
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
            <input type="text" id="bairro" v-model="endereco.bairro" :class="{ 'is-invalid': v$.endereco.bairro.$error }"
            @blur="v$.endereco.bairro.$touch()"  
            placeholder="Nome do bairro" />
            <div v-if="v$.endereco.bairro.$error" class="error-message">
              <div v-for="error in v$.endereco.bairro.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" v-model="endereco.cidade" :class="{ 'is-invalid': v$.endereco.cidade.$error }"
            @blur="v$.endereco.cidade.$touch()"  
            placeholder="Nome da cidade" />
            <div v-if="v$.endereco.cidade.$error" class="error-message">
              <div v-for="error in v$.endereco.cidade.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select id="estado" v-model="endereco.estado" :class="{ 'is-invalid': v$.endereco.estado.$error }">
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
            <div v-if="v$.endereco.estado.$error" class="error-message">
              <div v-for="error in v$.endereco.estado.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="photoUrl">Escolha uma photoUrl:</label>
            <input type="file" id="photoUrl" @change="handlephotoUrlUpload" accept="image/*" />
          </div>
          <div class="form-group">
            <label for="pais">País:</label>
            <input type="text" id="pais" v-model="endereco.pais" value="Brasil" readonly />
          </div>
        </div>
        <button type="submit" :disabled="loading" class="btn-register">
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
      <div class="links">
        <router-link to="/login">Já tem conta? Faça login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailValidator, minLength, numeric, maxLength } from '@vuelidate/validators';
import { authService } from '@/services/authService';
import { buscarEnderecoViaCep } from '@/services/cepService';

const router = useRouter();
const displayName = ref('');
const email = ref('');
const password = ref('');
const telefone = ref('');
const endereco = ref({
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  pais: 'Brasil'});
const loading = ref(false);
const error = ref('');
const cepTimeout = ref(null);

const rules = {
  displayName: { required },
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(6) },
  telefone: { required, numeric, minLength: minLength(10), maxLength: maxLength(15) },
  endereco: {
    cep: { required, numeric, minLength: minLength(8), maxLength: maxLength(8) },
    rua: { required, minLength: minLength(3) },
    numero: { required, numeric, maxLength: maxLength(5) },
    bairro: { required, minLength: minLength(2) },
    cidade: { required, minLength: minLength(2) },
    estado: { required }
  }
};
const arquivo = ref([]);

const handlephotoUrlUpload = (event) => {
  const file = event.target.files[0];
  arquivo.value = file ? [file] : [];
};

const v$ = useVuelidate(rules, { displayName, email, password, telefone, endereco });

const buscarCep = () => {
  clearTimeout(cepTimeout.value);

  let cepLimpo = endereco.value.cep.replace(/\D/g, '');
  endereco.value.cep = cepLimpo;

  if (cepLimpo.length === 8) {
    cepTimeout.value = setTimeout(async () => {
      error.value = '';
      try {
        loading.value = true;
        const enderecoData = await buscarEnderecoViaCep(cepLimpo);

        endereco.value.rua = enderecoData.logradouro;
        endereco.value.bairro = enderecoData.bairro;
        endereco.value.cidade = enderecoData.cidade;
        endereco.value.estado = enderecoData.estado;

      } catch (err) {
        endereco.value.rua = '';
        endereco.value.bairro = '';
        endereco.value.cidade = '';
        endereco.value.estado = '';
        error.value = 'CEP não encontrado ou inválido.';
      } finally {
        loading.value = false;
      }
    }, 500);
  }
};

const handleRegister = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  loading.value = true;
  error.value = '';

  try {
    const arquivoFoto = arquivo.value[0] || null;

    const userData = {
      nome: displayName.value,
      email: email.value,
      telefone: telefone.value,
      endereco: endereco.value,
    };

    await authService.registrar(email.value, password.value, displayName.value, arquivoFoto, userData);

    router.push('/');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.register-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #d4af37;
}

.btn-register {
  width: 100%;
  padding: 0.75rem;
  background-color: #d4af37;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-register:hover:not(:disabled) {
  background-color: #b8941f;
}

.btn-register:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #d9534f;
  text-align: left;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.is-invalid {
  border-color: #d9534f;
}

.links {
  text-align: center;
  margin-top: 1.5rem;
}

.links a {
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

.cep-group {
  display: flex;
  gap: 0.5rem;
}

.cep-group input {
  flex: 1;
}

.btn-cep {
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cep:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-cep:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

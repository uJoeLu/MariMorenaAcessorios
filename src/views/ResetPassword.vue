<template>
  <div class="reset-container">
    <div class="reset-form">
      <h2>Redefinir Senha</h2>
      <p>Digite seu email para receber um link de redefinição de senha.</p>
      <form @submit.prevent="handleReset" v-if="!success">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Digite seu email"
          />
        </div>
        <button type="submit" :disabled="loading" class="btn-reset">
          {{ loading ? 'Enviando...' : 'Enviar Link' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
      <div v-if="success" class="success-message">
        <p>Um link de redefinição foi enviado para seu email.</p>
        <p>Verifique sua caixa de entrada e siga as instruções.</p>
      </div>
      <div class="links">
        <router-link to="/login">Voltar ao Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '@/services/authService';

const email = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

const handleReset = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authService.resetPassword(email.value);
    success.value = true;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.reset-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.reset-form h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.reset-form p {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
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

.btn-reset {
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

.btn-reset:hover:not(:disabled) {
  background-color: #b8941f;
}

.btn-reset:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #d9534f;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.success-message {
  text-align: center;
  color: #28a745;
  margin-bottom: 1.5rem;
}

.success-message p {
  margin-bottom: 0.5rem;
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
</style>

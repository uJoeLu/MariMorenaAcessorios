<template>
    <div class="login-page">

            <img src="../assets/logofull.jpeg" alt="Logo">

        <div class="form">
            <h2>Entrar com sua conta<br>Mari Morena</h2>
            <h3>Acessórios</h3>
            <form @submit.prevent="login">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required v-model="email"/>
                </div>
                <div>
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required v-model="senha" />
                    <p :style="{ opacity: 0.5 }"><router-link to="/redefinicao">Esqueceu a senha?</router-link></p>                    
                </div>
                <div class="button-group">
                    <button><router-link to="/cadastro">Cadastre-se</router-link>
                    </button>
                    <button type="submit">Entrar</button>
                </div>
            </form>
            <p v-if="mensagem" :class="{ success: isSuccess, error: !isSuccess }">{{ mensagem }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { logar, getUsuarioLogado } from '@/service/authService';
const email = ref('');
const senha = ref('');
const mensagem = ref('');
const isSuccess = ref(false);
const usuarioLogado = ref(null);

const checkSession = () => {
  const user = getUsuarioLogado();
  usuarioLogado.value = user ? user.email : null;
};

const login = () => {
  mensagem.value = '';
  if (!email.value || !senha.value) {
    mensagem.value = 'Preencha todos os campos.';
    isSuccess.value = false;
    return;
  }

  try {
    const resultado = logar(email.value, senha.value);

    mensagem.value = 'Login realizado com sucesso!';
    isSuccess.value = true;
    usuarioLogado.value = resultado.email;
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
    

    email.value = '';
    senha.value = '';

  } catch (error) {
    mensagem.value = error.message;
    isSuccess.value = false;
  }
};

onMounted(() => {
  checkSession();
});
</script>
<style scoped>
.login-page {
    display: grid;
    gap: 200px;
    place-items: center;
    margin: auto;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    min-height: 100vh;   
}

.form {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    background: #FEDE8B;
}
.form input {
    border-radius: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
    background: white;
}
.form h2{
    margin-top: 0;
    text-align: center;
}
.form h3{
    text-align: center;
    margin-top: -1.5rem;
}

.success {
    color: green;
}
.error {
    color: red;
}
form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 3rem;
    max-width: 300px;
    margin-left: 3rem;
    margin-right: 3rem;
    justify-content: center;
    align-items: center;
}
.button-group {
    display: flex;
    place-items: center;
    gap: 10px;
}

@media (max-width: 768px) {
    .login-page {
        grid-template-columns: 1fr;
        gap: 50px;
        padding: 20px;
    }

    .form {
        max-width: 100%;
        margin-top: 0;
    }

    form {
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
</style>

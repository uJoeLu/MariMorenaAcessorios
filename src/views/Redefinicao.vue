<template>
    <div class="container">
        <div class="redefinicao">
            <h1>Redefinição de senha</h1>
            <p>Insira seu e-mail para redefinir sua senha.</p>
        </div>
        <div class="form">
            <form @submit.prevent="senhaNova">
                <div class="input-group">
                    <label for="email">E-mail</label>
                    <input id="email" type="email" placeholder="E-mail" v-model="email" required />
                    <label for="dataNasc">Data de nascimento</label>
                    <input id="dataNasc" type="date" placeholder="Data de nascimento" v-model="dataNasc" required />
                    <label for="novaSenha">Nova senha</label>
                    <input id="novaSenha" type="password" placeholder="Digite a nova senha" v-model="novaSenha" required />
                    <label for="confirmarSenha">Confirmar senha</label>
                    <input id="confirmarSenha" type="password" placeholder="Confirme a nova senha" v-model="confirmarSenha" required />
                </div>
                <button type="submit">Redefinir senha</button>
            </form>
        </div>
        <div class="mensagem" v-if="mensagem">
            {{ mensagem }}
        </div>
        <div class="voltar">
            <a href="/login">Voltar para o login</a>
        </div>

    </div>
</template>
<script setup>
import { redefinirSenha } from '@/auth/autenticacao';
import { ref } from 'vue';
const email = ref('');
const dataNasc = ref('');
const novaSenha = ref('');
const confirmarSenha = ref('');
const mensagem = ref('');

async function senhaNova() {
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mensagem.value = 'E-mail inválido.';
        setTimeout(() => {
            mensagem.value = '';
            window.location.href = '/';
        }, 3000);
        return;
    }

    if (novaSenha.value.length < 6) {
        mensagem.value = 'A senha deve ter pelo menos 8 caracteres.';
        setTimeout(() => {
            mensagem.value = '';
        }, 2000);
        return;
    }

    if (novaSenha.value !== confirmarSenha.value) {
        mensagem.value = 'As senhas não coincidem.';
        setTimeout(() => {
            mensagem.value = '';
        }, 2000);

        return;
    }

    try {
        await redefinirSenha(email.value, dataNasc.value, novaSenha.value);
        mensagem.value = 'Senha redefinida com sucesso!';
        setTimeout(() => {
            mensagem.value = '';
            window.location.href = '/login';
        }, 2000);
        
    } catch (error) {
        mensagem.value = error.message || 'Erro ao redefinir a senha. Verifique os dados e tente novamente.';
        console.error(error);
    }
}

</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
}

.redefinicao {
    text-align: center;
    margin-bottom: 20px;
}

.form {
    width: 100%;
    max-width: 400px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    color: #333;
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.mensagem {
    color: red;
    margin-top: 10px;
    text-align: center;
}

.voltar {
    margin-top: 20px;
    text-align: center;
}

.voltar a {
    color: #007bff;
    text-decoration: none;
}

.voltar a:hover {
    text-decoration: underline;
}
</style>

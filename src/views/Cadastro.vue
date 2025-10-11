<template>
    <div class="pagina-cadastro">
        <img src="../assets/logofull.jpeg" alt="Mari Morena Acessórios">
        <div class="formulario">
            <h1 class="titulo">CRIE SUA CONTA <br> Mari Morena</h1>
            <form @submit.prevent="fazerCadastro">
                <div>
                    <p>Seu Email</p>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" v-model="email" required />
                </div>
                <div>
                    <p>Seu Nome Completo</p>
                    <label for="nome"></label>
                    <input type="text" id="nome" name="nome" v-model="nome" required />
                </div>
                <div>
                    <p>Data de nascimento</p>
                    <label for="dataNasc"></label>
                    <input type="date" id="dataNasc" name="dataNasc" v-model="dataNasc" required />
                </div>
                <div>
                    <p>Seu Endereço</p>
                    <label for="endereco"></label>
                    <input type="text" id="endereco" name="endereco" v-model="endereco" required />
                </div>
                <div>
                    <p>Bairro</p>
                    <label for="bairro"></label>
                    <input type="text" id="bairro" name="bairro" v-model="bairro" required />
                </div>
                <div>
                    <p>CEP</p>
                    <label for="cep"></label>
                    <input type="text" id="cep" name="cep" v-model="cep" required />
                </div>
                <div>
                    <p>Estado</p>
                    <label for="estado"></label>
                    <input type="text" id="estado" name="estado" v-model="estado" required />
                </div>
                <div>
                    <p>Cidade</p>
                    <label for="cidade"></label>
                    <input type="text" id="cidade" name="cidade" v-model="cidade" required />
                </div>
                <div>
                    <p>Seu Telefone</p>
                    <label for="telefone"></label>
                    <input type="text" id="telefone" name="telefone" v-model="telefone" required />
                </div>
                <div>
                    <p>Senha</p>
                    <label for="senha"></label>
                    <input type="password" id="senha" name="senha" v-model="senha" required />
                </div>
                <div>
                    <p>Confirmar Senha</p>
                    <label for="confirmarSenha"></label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" v-model="confirmarSenha"
                        required />
                </div>
                <div class="check">
                    <div class="termos">
                        <input type="checkbox" id="termos" name="termos" v-model="termos" required />
                        <label for="termos">Aceito os termos de uso e política de privacidade</label>
                    </div>
                    <div class="botoes">
                        <button type="submit">Cadastrar</button>
                        <button type="button"><router-link to="/login">Já tenho conta</router-link></button>
                    </div>
                </div>
                <div v-if="mensagem" :class="['mensagem', { sucess: isSuccess, error: !isSuccess }]">
                    {{ mensagem }}
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { cadastrarUsuario, getUsuarioLogado } from '@/auth/autenticacao';
const email = ref('')
const nome = ref('')
const dataNasc = ref('')
const endereco = ref('')
const bairro = ref('')
const cep = ref('')
const estado = ref('')
const cidade = ref('')
const telefone = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const mensagem = ref('')
const isSuccess = ref(false)
const usuarioLogado = ref(null)

function confirmarPassword() {
    if (senha.value !== confirmarSenha.value) {
        isSuccess.value = false
        return false
    }
    return true
}
function checkSession() {
    const usuario = getUsuarioLogado()
    if (usuario) {
        usuarioLogado.value = usuario
    }
}
function fazerCadastro() {
    const dadosUsuario = {
        email: email.value,
        nome: nome.value,
        dataNasc: dataNasc.value,
        endereco: endereco.value,
        bairro: bairro.value,
        cep: cep.value,
        estado: estado.value,
        cidade: cidade.value,
        telefone: telefone.value,
        senha: senha.value
    }
    if (!confirmarPassword()) {
        mensagem.value = 'As senhas não coincidem.'
        return
    }

    try {
        cadastrarUsuario(dadosUsuario)
        mensagem.value = 'Cadastro realizado com sucesso!'
        isSuccess.value = true
        
        window.location.href = '/login'

    } catch (error) {        
        mensagem.value = 'Erro ao realizar cadastro: ' + error.message
        isSuccess.value = false
    }
}
onMounted(() => {
    checkSession()
})

</script>
<style scoped>
.pagina-cadastro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    width: 100%;
    max-width: 1200px;
    gap: 200px;
    padding: 2rem;
    min-height: 100vh;
}

.pagina-cadastro img {
    max-width: 100%;
    height: auto;
    align-self: center;
    justify-self: center;

}

.formulario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FEDE8B;
    border-radius: 8px;
    padding: 2rem;
}

.formulario form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: #FEDE8B;
    gap: 1rem;
}
.formulario input {
    border-radius: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background: white;
}

.sucess {
    color: green;
    
}
.error{
    color: red;
    
}

.check {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    grid-column: span 2;

}


.formulario h1 {
    text-align: center;
    margin-bottom: 1.5rem;
}

.botoes {
    display: flex;
    gap: 1rem;
}

@media (max-width: 768px) {
    .pagina-cadastro {
        grid-template-columns: 1fr;
        padding: 1rem;
        gap: 1rem;
    }

    .formulario form {
        grid-template-columns: 1fr;
        padding: 1rem;
        max-width: 100%;
    }

    .botoes {
        flex-direction: column;
        width: 100%;
    }

    .botoes button {
        width: 100%;
    }
}
</style>

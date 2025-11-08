<template>
    <div class="meus-dados-container">

        <div v-if="!isAutenticado" class="meus-dados-content">
            <p>Usuário não está logado.</p>
        </div>

        <div v-else-if="!modoEdicao" class="meus-dados-content">
            <h2>Meus Dados</h2>
            <button v-if="usuario" @click="iniciarEdicao" class="btn btn-editar">
                Editar Perfil
            </button>
            <p v-if="usuario"><strong>Email:</strong> {{ usuario.email }}</p>
            <p v-if="usuario"><strong>Nome:</strong> {{ usuario.nome }}</p>
            <p v-if="usuario"><strong>Telefone:</strong> {{ usuario.telefone }}</p>

            <h3 class="endereco-titulo">Endereço Principal</h3>
            <div v-if="primeiroEndereco" class="endereco-info">
                <p>{{ primeiroEndereco.rua }}, {{ primeiroEndereco.numero }}, {{ primeiroEndereco.bairro }}</p>
                <p>{{ primeiroEndereco.cidade }} - {{ primeiroEndereco.estado }}, CEP: {{ primeiroEndereco.cep }}</p>
            </div>
            <div v-else>
                <p>Nenhum endereço cadastrado.</p>
            </div>
        </div>

        <div v-else class="meus-dados-form">
            <h3>Editar Perfil</h3>
            <form @submit.prevent="salvarAlteracoes">
                <div class="input-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" v-model="formDados.nome" required>
                </div>
                <div class="input-group">
                    <label for="telefone">Telefone:</label>
                    <input type="text" id="telefone" v-model="formDados.telefone" required>
                </div>

                <div class="botoes-edicao">
                    <button type="submit" class="btn btn-salvar">Salvar</button>
                    <button type="button" @click="cancelarEdicao" class="btn btn-cancelar">Cancelar</button>
                </div>
                <p v-if="mensagem" :class="['mensagem', { success: isSuccess, error: !isSuccess }]">{{ mensagem }}</p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { AuthService } from '@/service/authService'
import { UsuarioService } from '@/service/usuarioService'
import { ref, onMounted, computed } from 'vue'

const authService = new AuthService();
const usuarioService = new UsuarioService();

const usuario = ref(null);
const enderecos = ref([]);
const modoEdicao = ref(false);
const formDados = ref({ nome: '', telefone: '' });
const mensagem = ref('');
const isSuccess = ref(false);
const isAutenticado = ref(false);

const primeiroEndereco = computed(() => {
    return enderecos.value.length > 0
        ? enderecos.value.find(e => e.isPrincipal) || enderecos.value[0]
        : null;
});

const iniciarEdicao = () => {
    if (usuario.value) {
        formDados.value = {
            nome: usuario.value.nome || '',
            telefone: usuario.value.telefone || ''
        };
        modoEdicao.value = true;
        mensagem.value = '';
    }
};

const salvarAlteracoes = async () => {
    try {
        await usuarioService.atualizar(usuario.value.id, formDados.value);
        usuario.value = { ...usuario.value, ...formDados.value };
        mensagem.value = 'Dados atualizados com sucesso!';
        isSuccess.value = true;
        modoEdicao.value = false;
        setTimeout(() => {
            mensagem.value = '';
        }, 3000);
    } catch (error) {
        mensagem.value = 'Erro ao atualizar dados: ' + error.message;
        isSuccess.value = false;
        setTimeout(() => {
            mensagem.value = '';
        }, 3000);
    }
};

const cancelarEdicao = () => {
    modoEdicao.value = false;
    mensagem.value = '';
};

onMounted(async () => {
    try {
        isAutenticado.value = await authService.isAutenticado();
        if (isAutenticado.value) {
            usuario.value = await authService.getUsuarioLogado();
            if (usuario.value) {
                enderecos.value = await usuarioService.buscarEnderecosDoUsuario(usuario.value.id);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
});
</script>
<style scoped>
.meus-dados-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.meus-dados-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meus-dados-content h2 {
    margin-top: 0;
    color: #333;
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin: 5px;
}

.btn-editar {
    background-color: #007bff;
    color: white;
}

.btn-editar:hover {
    background-color: #0056b3;
}

.meus-dados-form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meus-dados-form h3 {
    margin-top: 0;
    color: #333;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.botoes-edicao {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn-salvar {
    background-color: #28a745;
    color: white;
}

.btn-salvar:hover {
    background-color: #218838;
}

.btn-cancelar {
    background-color: #dc3545;
    color: white;
}

.btn-cancelar:hover {
    background-color: #c82333;
}

.mensagem {
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
}

.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.endereco-titulo {
    margin-top: 20px;
    color: #333;
}

.endereco-info {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
}
</style>

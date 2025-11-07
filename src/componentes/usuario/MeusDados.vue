<template>
    <div class="meus-dados-container">
        
        <div v-if="!usuario">
            <p>Usuário não está logado.</p>
        </div>
        
        <div v-else-if="!modoEdicao" class="meus-dados-content">
            <h2>Meus Dados</h2>
            <button v-if="usuario && !modoEdicao" @click="iniciarEdicao" class="btn btn-editar">
                Editar Perfil
            </button>
            <p><strong>Email:</strong> {{ usuario.email }}</p>
            <p><strong>Nome:</strong> {{ usuario.nome }}</p>
            <p><strong>Telefone:</strong> {{ usuario.telefone }}</p>

            <h3 class="endereco-titulo">Endereço Principal</h3>
            <div v-if="primeiroEndereco" class="endereco-info">
                <p>{{ primeiroEndereco.rua }}, {{ primeiroEndereco.bairro }}</p>
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
                <p v-if="mensagem" :class="['mensagem', { sucess: isSuccess, error: !isSuccess }]">{{ mensagem }}</p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { AuthService } from '@/service/authService'
import { ref, onMounted, computed } from 'vue'

const authService = new AuthService();

const primeiroEndereco = computed(() => {
    return usuario.value && usuario.value.enderecos.length > 0
        ? usuario.value.enderecos.find(e => e.isPrincipal) || usuario.value.enderecos[0]
        : null;
});

const usuario = ref(null)

onMounted(() => {
    usuario.value = authService.getUsuarioLogado()
})
</script>
<style scoped>

.meus-dados-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>

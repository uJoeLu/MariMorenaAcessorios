<template>
    <div class="meus-dados-container" v-if="usuario">
        <div class="meus-dados-content">
            <p>Email: {{ usuario.email }}</p>
            <p>Nome: {{ usuario.nome }}</p>
            <p>Endereço: {{ usuario.endereco }}</p>
            <p>Bairro: {{ usuario.bairro }}</p>
            <p>CEP: {{ usuario.cep }}</p>
            <p>Estado: {{ usuario.estado }}</p>
            <p>Cidade: {{ usuario.cidade }}</p>
            <p>Telefone: {{ usuario.telefone }}</p>
        </div>
    </div>
    <div v-else>
        <p>Usuário não está logado.</p>
    </div>
</template>
<script setup>
import { getUsuarioLogado } from '@/auth/autenticacao'
import { ref, onMounted } from 'vue'

const usuario = ref(null)

onMounted(() => {
    usuario.value = getUsuarioLogado()
})
</script>
<style scoped>
    .meus-dados-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.meus-dados-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>

<template>
    <div class="meus-dados-container">
        <div class="meus-dados-content">
            {{ getUsuarioLogado().email }}
            {{ getUsuarioLogado().nome }}
            {{ getUsuarioLogado().endereco }}
            {{ getUsuarioLogado().bairro }}
            {{ getUsuarioLogado().cep }}
            {{ getUsuarioLogado().estado }}
            {{ getUsuarioLogado().cidade }}
            {{ getUsuarioLogado().telefone }}
        </div>
        
    </div>
</template>
<script setup>
import { getUsuarioLogado } from '@/auth/autenticacao'
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
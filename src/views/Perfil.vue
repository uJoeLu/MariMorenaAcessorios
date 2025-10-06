<template>
    <div class="perfil-container">
        <div class="sidebar">
            <button @click="activeTab = 'dados'" :class="{ active: activeTab === 'dados' }">Meus Dados</button>
            <button @click="activeTab = 'pedidos'" :class="{ active: activeTab === 'pedidos' }">Meus Pedidos</button>
            <button @click="activeTab = 'favoritos'" :class="{ active: activeTab === 'favoritos' }">Meus Favoritos</button>
            <button @click="activeTab = 'comentarios'" :class="{ active: activeTab === 'comentarios' }">Comentários</button>
            <button @click="logout" class="logout-btn">Sair</button>
        </div>
        <div class="content">
            <MeusDados v-if="activeTab === 'dados'" />
            <MeusPedidos v-if="activeTab === 'pedidos'" />
            <Favoritos v-if="activeTab === 'favoritos'" />
            <Comentário v-if="activeTab === 'comentarios'" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MeusDados from '@/componentes/usuario/MeusDados.vue'
import MeusPedidos from '@/componentes/usuario/MeusPedidos.vue'
import Favoritos from '@/componentes/usuario/Favoritos.vue'
import Comentário from '@/componentes/usuario/Comentário.vue'
import { logout } from '@/auth/autenticacao'

const activeTab = ref('dados')
</script>

<style scoped>
.perfil-container {
    display: flex;
    height: 100vh;
    background-color: #2B2B2B;
}

.sidebar {
    width: 200px;
    background-color: #FEDE8B;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.sidebar button {
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-align: left;
}

.sidebar button.active {
    background-color: #2B2B2B;
    color: #FEDE8B;
}

.logout-btn {
    margin-top: auto;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #fff;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .perfil-container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
    }

    .sidebar button {
        flex: 1;
        text-align: center;
    }
}
</style>

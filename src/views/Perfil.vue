<template>
    <div class="perfil-container">
        <div class="sidebar">
            <router-link to="/perfil/meusdados" class="sidebar-link">Meus Dados</router-link>
            <router-link to="/perfil/meuspedidos" class="sidebar-link">Meus Pedidos</router-link>
            <router-link to="/perfil/favoritos" class="sidebar-link">Meus Favoritos</router-link>
            <router-link to="/perfil/comentarios" class="sidebar-link">Comentários</router-link>
            <button @click="logout" class="logout-btn">Sair</button>
        </div>
        <div class="content">
            <router-view v-if=" useFavoritos().favoritos"/>
            <div v-else>
                <h2>Não há itens favoritados</h2>
            </div>
        </div>
         
    </div>
</template>

<script setup>
import { logout } from '@/service/autenticacao'
import { useFavoritos } from '@/store/Favoritos';

</script>

<style scoped>
.perfil-container {
    display: flex;
    min-height: 100vh;
    width: 100%;
    background-color: #2B2B2B;
}

.sidebar {
    width: 200px;
    background-color: #FEDE8B;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.sidebar-link {
    margin-bottom: 10px;
    padding: 10px;
    text-decoration: none;
    color: #2B2B2B;
    display: block;
    cursor: pointer;
    text-align: left;
}

.sidebar-link.router-link-active {
    background-color: #2B2B2B;
    color: #FEDE8B;
}

.logout-btn {
    margin-top: auto;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #2B2B2B;
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

    .sidebar-link {
        flex: 1;
        text-align: center;
    }
}
</style>

<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <img src="@/assets/logo.png" alt="Mari Morena Acessórios" />
        </div>
        <div class="busca">
            <input type="text" placeholder="Buscar..." />
        </div>
        <ul class="navbar-links">
            <li><a><router-link to="/"><font-awesome-icon :icon="['fas', 'home']" />  </router-link></a></li>
            <li><a><router-link to="/perfil/favoritos"><font-awesome-icon :icon="['fas', 'heart']" /></router-link></a></li>
            <li><a><router-link to="/sacola"><font-awesome-icon :icon="['fas', 'bag-shopping']" />
            <span class="qtd">
              {{ totalQuantidade }}
            </span>
            </router-link></a></li>
            <li v-if=" getUsuarioLogado() === null " class="nav-item guest-section dropdown">
                <font-awesome-icon :icon="['fas', 'user']" />
                <div class="dropdown-content">
                    <router-link to="/login">Entrar</router-link>
                    <router-link to="/cadastro">Cadastrar</router-link>
                </div>
            </li>
            <li v-else class="nav-item user-section dropdown">
                <font-awesome-icon :icon="['fas', 'user']" />
                {{ getUsuarioLogado().nome }}
                <div class="dropdown-content">
                    <router-link to="/perfil">Perfil</router-link>
                    <router-link to="/perfil/meuspedidos">Meus Pedidos</router-link>
                    <router-link to="/perfil/favoritos">Favoritos</router-link>
                    <router-link to="/perfil/comentarios">Comentarios</router-link>
                    <a @click="logout()">Sair</a>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { useSacola } from '@/store/Sacola';
import { storeToRefs } from 'pinia';
import {  getUsuarioLogado, logout } from '@/auth/autenticacao';

const sacola = useSacola();
const {totalQuantidade} = storeToRefs(sacola);
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2B2B2B;
    padding: 0 20px;
}

.navbar-logo {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

.navbar-logo img {
    height: 100px;
    width: auto;
}

.busca {
    left: 20px;
    position: absolute;
}

.busca input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
    margin-left: 20px;
}

.navbar-links {
    position: relative;
    list-style: none;
    display: flex;
    gap: 20px;
    margin-right: 20px;
}


.navbar-links a {
    text-decoration: none;
    font-size: 1.5rem;
    color: #FEDE8B;
    transition: color 0.2s;
}

.navbar-links a:hover {
    color: #c2185b;
}

.guest-section, .user-section {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #FEDE8B;
}

.dropdown {
    position: relative;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #2B2B2B;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    top: 100%;
    right: 0;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-content a {
    color: #FEDE8B;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #c2185c7c;
}
.qtd{
    position: relative;
    top: -15px;
    right: 5px;
    background-color: red;
    color: white;
    border-radius: 100%;
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
}

@media (max-width: 768px) {
    .navbar {
        flex-wrap: wrap;
        padding: 10px;
    }

    .navbar-logo img {
        height: 60px;
    }

    .busca {
        position: static;
        width: 100%;
        margin: 10px 0;
    }

    .busca input {
        width: 100%;
        margin-left: 0;
    }

    .navbar-links {
        gap: 10px;
        margin-right: 0;
    }

    .navbar-links a {
        font-size: 1.2rem;
    }

    .qtd {
        top: 10px;
        right: 10px;
    }
}
</style>

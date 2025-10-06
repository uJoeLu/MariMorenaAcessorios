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
            <li><a><router-link to="/favoritos"><font-awesome-icon :icon="['fas', 'heart']" /></router-link></a></li>
            <li><a><router-link to="/sacola"><font-awesome-icon :icon="['fas', 'bag-shopping']" />
            <span class="qtd">
              {{ totalQuantidade }}
            </span>
            </router-link></a></li>
            <li v-if=" getUsuarioLogado() === null " class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
                    :aria-expanded="isDropdownOpen"
                    @click.prevent="toggleDropdown">
                    <font-awesome-icon :icon="['fas', 'user']" />
                </a>
                <div class="dropdown-menu" v-if="isDropdownOpen">
                    <router-link class="dropdown-item" to="/login">Entrar</router-link>
                    <router-link class="dropdown-item" to="/cadastro">Cadastrar</router-link>
                </div>
            </li>
            <li v-else class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" aria-haspopup="true"
                    :aria-expanded="isDropdownOpen"
                    @click.prevent="toggleDropdown">
                    <font-awesome-icon :icon="['fas', 'user']" />
                    {{ getUsuarioLogado().nome }}
                </a>
                <div class="dropdown-menu" v-if="isDropdownOpen">
                    <router-link class="dropdown-item" to="/perfil">Perfil</router-link>
                    <router-link class="dropdown-item" to="/pedidos">Meus Pedidos</router-link>
                    <a class="dropdown-item" @click="logout()">Sair</a>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useSacola } from '@/store/Sacola';
import { storeToRefs } from 'pinia';
import { getUsuarioLogado, logout } from '@/auth/autenticacao';

const sacola = useSacola();
const {totalQuantidade} = storeToRefs(sacola);
const isDropdownOpen = ref(false);

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}
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
.navbar-links .dropdown-menu {
    display: grid;
    position: absolute;
    left: 50%;
    
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    
}

.navbar-links a:hover {
    color: #c2185b;
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

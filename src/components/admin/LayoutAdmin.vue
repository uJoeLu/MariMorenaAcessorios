<template>
    <div class="admin-layout">
        <aside class="sidebar">
            <div class="sidebar-header">
                <h3>Admin MariMorena</h3>
            </div>
            <nav class="sidebar-nav">
                <router-link to="/admin/dashboard" class="nav-link">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </router-link>
                <router-link to="/admin/produtos" class="nav-link">
                    <i class="fas fa-box"></i> Produtos
                </router-link>
                <router-link to="/admin/pedidos" class="nav-link">
                    <i class="fas fa-receipt"></i> Pedidos
                </router-link>
                <router-link to="/admin/categorias" class="nav-link">
                    <i class="fas fa-tags"></i> Categorias
                </router-link>
                <router-link to="/admin/usuarios" class="nav-link">
                    <i class="fas fa-users"></i> Usuários
                </router-link>
                <router-link to="/admin/configuracoes" class="nav-link">
                    <i class="fas fa-cog"></i> Configurações
                </router-link>
            </nav>
            <button @click="logout" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </aside>
        <main class="main-content">
            <header class="navbar">
                <div class="navbar-brand">
                    <h2>Painel Administrativo</h2>
                </div>
                <div class="navbar-profile">
                    <span>Olá, Admin!</span>
                    <img src="/default-avatar.png" alt="Admin Avatar" class="profile-avatar" />
                </div>
            </header>
            <div class="content-area">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';

const router = useRouter();

const logout = async () => {
    await authService.logout()
}
</script>
        
<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>Admin MariMorena</h3>
      </div>
      <nav class="sidebar-nav">
        <!-- Visão Geral -->
        <div class="nav-section">
          <h4 class="nav-section-title">Visão Geral</h4>
          <router-link to="/admin/dashboard" class="nav-link">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </router-link>
        </div>

        <!-- Gestão -->
        <div class="nav-section">
          <h4 class="nav-section-title">Gestão</h4>
          <router-link to="/admin/produtos" class="nav-link">
            <i class="fas fa-box"></i> Produtos
          </router-link>
          <router-link to="/admin/pedidos" class="nav-link">
            <i class="fas fa-receipt"></i> Pedidos
          </router-link>
          <router-link to="/admin/clientes" class="nav-link">
            <i class="fas fa-users"></i> Clientes
          </router-link>
        </div>

        <!-- Relatórios -->
        <div class="nav-section">
          <h4 class="nav-section-title">Análises</h4>
          <router-link to="/admin/relatorios" class="nav-link">
            <i class="fas fa-chart-bar"></i> Relatórios
          </router-link>
        </div>
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
          <span>Olá, {{ usuario.displayName }}</span>
          <img src="@/assets/logo-icon.png" alt="Admin Avatar" class="profile-avatar" />
        </div>
      </header>
      <div class="content-area">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const usuario = authService.getCurrentUser()

const router = useRouter()

const logout = async () => {
  try {
    await authService.logout()
    router.push('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>

<style>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #1a1a1a;
}

/* --- SIDEBAR --- */
.sidebar {
  width: 260px;
  background-color: #111;
  color: #fff;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 5px rgba(0,0,0,0.3);
}

.sidebar-header h3 {
  font-size: 1.4rem;
  font-weight: bold;
  color: #f5f5dc;
  text-align: center;
  margin-bottom: 25px;
}

/* SEÇÕES DA NAV */
.nav-section {
  margin-bottom: 25px;
}

.nav-section-title {
  color: #f5f5dc;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 10px;
  opacity: 0.9;
}

/* LINKS */
.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: #ccc;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}

.nav-link i {
  width: 20px;
  text-align: center;
}

/* Hover elegante */
.nav-link:hover {
  background-color: #1e1e1e;
  color: #fff;
}

/* Item ativo */
.router-link-active {
  background-color: #f5f5dc;
  color: #111 !important;
  font-weight: bold;
}

.router-link-active i {
  color: #111;
}

/* BOTÃO DE SAIR */
.logout-btn {
  margin-top: auto;
  background: #c2185b;
  border: none;
  color: white;
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #9c164c;
}

/* --- MAIN CONTENT --- */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* NAVBAR SUPERIOR */
.navbar {
  background: #f5f5dc;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
}

.navbar-brand h2 {
  margin: 0;
  color: #333;
}

.navbar-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  font-weight: 500;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* ÁREA PRINCIPAL DOS COMPONENTES */
.content-area {
  padding: 25px;
}

</style>
        
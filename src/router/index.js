// Lazy-loaded components for better performance
const ListaClientes = () => import('@/components/admin/clientes/ListaClientes.vue')
const DetalhesCliente = () => import('@/components/admin/clientes/DetalhesCliente.vue')
const Dashboard = () => import('@/components/admin/Dashboard.vue')
const Relatorios = () => import('@/components/admin/Relatorios.vue')
const ListaPedidos = () => import('@/components/admin/pedidos/ListaPedidos.vue')
const DetalhesPedido = () => import('@/components/admin/pedidos/DetalhesPedido.vue')
const CadastrarProduto = () => import('@/components/admin/produtos/CadastrarProduto.vue')
const ListaProdutos = () => import('@/components/admin/produtos/ListaProdutos.vue')
const Checkout = () => import('@/components/checkout/Checkout.vue')
const Confirmacao = () => import('@/components/checkout/Confirmacao.vue')
const Endereco = () => import('@/components/checkout/Endereco.vue')
const Pagamento = () => import('@/components/checkout/Pagamento.vue')
const Favoritos = () => import('@/components/usuario/Favoritos.vue')
const Meusdados = () => import('@/components/usuario/Meusdados.vue')
const MeusPedidos = () => import('@/components/usuario/MeusPedidos.vue')
const Catalogo = () => import('@/views/Catalogo.vue')
const Perfil = () => import('@/views/Perfil.vue')
const ProdutoDetalhes = () => import('@/views/ProdutoDetalhes.vue')
const Sacola = () => import('@/views/Sacola.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const ResetPassword = () => import('@/views/ResetPassword.vue')
const AtualizarProduto = () => import('@/components/admin/produtos/AtualizarProduto.vue')
const LayoutAdmin = () => import('@/components/admin/LayoutAdmin.vue')

import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'

// Guard functions
const authGuard = async (to, from, next) => {
  if (await authService.waitForUser()) {
    next()
  } else {
    next('/login')
  }
}

const adminGuard = async (to, from, next) => {
  const user = await authService.waitForUser()
  if (user) {
    const idTokenResult = await user.getIdTokenResult()
    if (idTokenResult.claims.admin) {
      next()
    } else {
      next('/')
    }
  } else {
    next('/login')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    { path: '/', name: 'catalogo', component: Catalogo },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/reset-password', name: 'reset-password', component: ResetPassword },
    { path: '/sacola', name: 'sacola', component: Sacola },
    { path: '/produto/:id', name: 'produto-detalhes', component: ProdutoDetalhes },

    // User authenticated routes
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
      beforeEnter: authGuard,
      children: [
        { path: 'meus-dados', name: 'perfil-dados', component: Meusdados },
        { path: 'meus-pedidos', name: 'perfil-pedidos', component: MeusPedidos },
        { path: 'favoritos', name: 'perfil-favoritos', component: Favoritos }
      ]
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: authGuard,
      children: [
        { path: 'endereco', name: 'checkout-endereco', component: Endereco },
        { path: 'pagamento', name: 'checkout-pagamento', component: Pagamento },
        { path: 'confirmacao', name: 'checkout-confirmacao', component: Confirmacao }
      ]
    },

    // Admin routes
    {
      path: '/admin',
      name: 'admin',
      component: LayoutAdmin,
      beforeEnter: adminGuard,
      children: [
        { path: 'dashboard', name: 'dashboard', component: Dashboard },
        { path: 'clientes', name: 'clientes', component: ListaClientes },
        { path: 'clientes/:id', name: 'cliente-detalhes', component: DetalhesCliente },
        { path: 'pedidos', name: 'pedidos', component: ListaPedidos },
        { path: 'pedidos/:id', name: 'pedido-detalhes', component: DetalhesPedido },
        { path: 'produtos', name: 'produtos', component: ListaProdutos },
        { path: 'produtos/cadastrar', name: 'produto-cadastrar', component: CadastrarProduto },
        { path: 'produtos/atualizar/:id', name: 'produto-atualizar', component: AtualizarProduto },
        { path: 'relatorios', name: 'relatorios', component: Relatorios }
      ]
    }
  ]
})




export default router

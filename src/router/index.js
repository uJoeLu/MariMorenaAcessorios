import { createRouter, createWebHistory } from 'vue-router'

import Catalogo from '@/views/Catalogo.vue'
import DetalhesProduto from '@/views/DetalhesProduto.vue'
import FinalizarCompra from '@/views/FinalizarCompra.vue'
import ViaBoleto from '@/views/ViaBoleto.vue'
import ViaCartao from '@/views/ViaCartao.vue'
import ViaPix from '@/views/ViaPix.vue'
import Sacola from '@/views/Sacola.vue'
import Login from '@/views/Login.vue'
import Cadastro from '@/views/Cadastro.vue'
import Perfil from '@/views/Perfil.vue'
import Redefinicao from '@/views/Redefinicao.vue'
import MeusDados from '@/componentes/usuario/MeusDados.vue'
import MeusPedidos from '@/componentes/usuario/MeusPedidos.vue'
import Favoritos from '@/componentes/usuario/Favoritos.vue'
import Comentarios from '@/componentes/usuario/Comentarios.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'catalogo', component: Catalogo},
    {path: '/login', name: 'login', component: Login},
    {path: '/cadastro', name: 'cadastro', component: Cadastro},
    {path: '/redefinicao', name: 'redefinicao', component: Redefinicao},
    {path: '/sacola', name: 'sacola', component: Sacola},
    {path: '/perfil', name: 'perfil', component: Perfil,
      children: [
        { path: 'meusdados', name: 'meusdados', component: MeusDados },
        { path: 'meuspedidos', name: 'meuspedidos', component: MeusPedidos },
        { path: 'favoritos', name: 'favoritos', component: Favoritos },
        { path: 'comentarios', name: 'comentarios', component: Comentarios }
      ]
    },
    {path: '/detalhes/:id', name: 'detalhes-produto', component: DetalhesProduto, props: true},
    {path: '/finalizar-compra', name: 'finalizar-compra', component: FinalizarCompra},
    {path: '/via-boleto', name: 'via-boleto', component: ViaBoleto},
    {path: '/via-cartao', name: 'via-cartao', component: ViaCartao},
    {path: '/via-pix', name: 'via-pix', component: ViaPix}
  ]
})

export default router

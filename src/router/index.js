import { createRouter, createWebHistory } from 'vue-router'

import Catalogo from '@/views/Catalogo.vue'
import Conta from '@/views/Conta.vue'
import Favoritos from '@/views/Favoritos.vue'
import DetalhesProduto from '@/views/DetalhesProduto.vue'
import FinalizarCompra from '@/views/FinalizarCompra.vue'
import ViaBoleto from '@/views/ViaBoleto.vue'
import ViaCartao from '@/views/ViaCartao.vue'
import ViaPix from '@/views/ViaPix.vue'
import Sacola from '@/views/Sacola.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'catalogo', component: Catalogo},
    {path: '/conta', name: 'conta', component: Conta},
    {path: '/favoritos', name: 'favoritos', component: Favoritos},
    {path: '/sacola', name: 'sacola', component: Sacola},
    {path: '/detalhes/:id', name: 'detalhes-produto', component: DetalhesProduto, props: true},
    {path: '/finalizar-compra', name: 'finalizar-compra', component: FinalizarCompra},
    {path: '/via-boleto', name: 'via-boleto', component: ViaBoleto},
    {path: '/via-cartao', name: 'via-cartao', component: ViaCartao},
    {path: '/via-pix', name: 'via-pix', component: ViaPix}
  ]
})

export default router

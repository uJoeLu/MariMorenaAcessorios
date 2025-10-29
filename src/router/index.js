import { createRouter, createWebHistory } from 'vue-router'

import Catalogo from '@/views/Catalogo.vue'
import DetalhesProduto from '@/views/DetalhesProduto.vue'
import FinalizarCompra from '@/views/FinalizarCompra.vue'
import Sacola from '@/views/Sacola.vue'
import Login from '@/views/Login.vue'
import Cadastro from '@/views/Cadastro.vue'
import Perfil from '@/views/Perfil.vue'
import Redefinicao from '@/views/Redefinicao.vue'

import MeusDados from '@/componentes/usuario/MeusDados.vue'
import MeusPedidos from '@/componentes/usuario/MeusPedidos.vue'
import Favoritos from '@/componentes/usuario/Favoritos.vue'
import Comentarios from '@/componentes/usuario/Comentarios.vue'

import Checkout from '@/componentes/checkout/Checkout.vue'
import ConfirmacaoStep from '@/componentes/checkout/ConfirmacaoStep.vue'
import EnderecoStep from '@/componentes/checkout/EnderecoStep.vue'
import PagamentoStep from '@/componentes/checkout/PagamentoStep.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalogo', component: Catalogo },
    { path: '/login', name: 'login', component: Login },
    { path: '/cadastro', name: 'cadastro', component: Cadastro },
    { path: '/redefinicao', name: 'redefinicao', component: Redefinicao },
    { path: '/sacola', name: 'sacola', component: Sacola },
    { path: '/perfil', name: 'perfil', component: Perfil,
      children: [
        { path: 'meusdados', name: 'perfil-dados', component: MeusDados },
        { path: 'meuspedidos', name: 'perfil-pedidos', component: MeusPedidos },
        { path: 'favoritos', name: 'perfil-favoritos', component: Favoritos },
        { path: 'comentarios', name: 'perfil-comentarios', component: Comentarios }
      ]
    },
    { path: '/detalhes/:id', name: 'detalhes-produto', component: DetalhesProduto, props: true },
    { path: '/finalizar-compra', name: 'finalizar-compra', component: FinalizarCompra },
    { path: '/checkout', name: 'checkout', component: Checkout,
      children: [
        { path: 'confirmacao', name: 'checkout-confirmacao', component: ConfirmacaoStep },
        { path: 'endereco', name: 'checkout-endereco', component: EnderecoStep },
        { path: 'pagamento', name: 'checkout-pagamento', component: PagamentoStep }
      ]
    }
  ]
})

export default router

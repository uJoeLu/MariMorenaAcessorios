<template>
    <div class="meus-pedidos-container">
        <h2>Meus Pedidos</h2>
        <p>Aqui você pode ver o histórico de seus pedidos.</p>
        <div v-if="pedidos.length === 0" class="sem-pedidos">
            <p>Você ainda não fez nenhum pedido.</p>
        </div>
        <div v-else class="pedidos-lista">
            <div v-for="pedido in pedidos" :key="pedido.id" class="pedido-card">
                <h3>Pedido #{{ pedido.id }}</h3>
                <p><strong>Data:</strong> {{ new Date(pedido.data).toLocaleDateString('pt-BR') }}</p>
                <p><strong>Status:</strong> {{ pedido.status }}</p>
                <p><strong>Total:</strong> R$ {{ pedido.totalPreco.toFixed(2) }}</p>
                <p><strong>Quantidade de Itens:</strong> {{ pedido.totalQuantidade }}</p>
                <div class="itens-pedido">
                    <h4>Itens:</h4>
                    <ul>
                        <li v-for="item in pedido.items" :key="item.id" class="item-pedido">
                           <div>
                            <button @click="$router.push(`/detalhes/${item.id}`)"><img :src="item.imagem" :alt="item.nome" width="50" /></button>
                           </div>
                           <div>
                            {{ item.nome }} <br />
                            Quantidade: {{ item.quantidade }} <br />
                            Preço: R$ {{ (item.preco * item.quantidade).toFixed(2) }} 
                           </div>
                           <div>
                            {{ pedido.status }}
                           </div>
                           <div style="display: grid; gap: 5px; align-items: center;">
                                <button @click="editarPedido">Editar</button>
                                <button @click="cancelarPedido(pedido.id)">Cancelar</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePedidos } from '@/store/Pedidos.js';

const pedidosStore = usePedidos();
const { getPedidosPorUsuario, cancelarPedido } = pedidosStore;

const pedidos = getPedidosPorUsuario;

const editarPedido = () => {
    alert('Funcionalidade de edição de pedido ainda não implementada.');
};

</script>

<style scoped>
.meus-pedidos-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sem-pedidos {
    text-align: center;
    color: #666;
    font-style: italic;
}
.item-pedido {
    display: grid;
    grid-template-columns: auto 1fr 1fr auto;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.pedidos-lista {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.pedido-card {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.pedido-card h3 {
    margin-top: 0;
    color: #333;
}

.pedido-card p {
    margin: 5px 0;
}

.itens-pedido {
    margin-top: 10px;
}

.itens-pedido h4 {
    margin-bottom: 5px;
    color: #555;
}

.itens-pedido ul {
    list-style-type: none;
    padding: 0;
}

.itens-pedido li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}
</style>

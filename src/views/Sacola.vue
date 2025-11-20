<template>
  <div class="sacola">
    <div class="sacola-container">
      <h1 class="titulo">Minha Sacola</h1>

      <div v-if="itens.length === 0" class="vazio">
        <p>Sua sacola está vazia</p>
        <router-link to="/" class="btn-continuar">Continuar Comprando</router-link>
      </div>

      <div v-else class="sacola-content">
        <div class="itens-lista">
          <div v-for="item in itens" :key="item.id" class="item-card">
            <div class="item-imagem">
              <img :src="item.imagens[0].url" :alt="item.nome" />
            </div>

            <div class="item-info">
              <h3>{{ item.nome }}</h3>
              <p class="categoria">{{ item.categoria }}</p>
              <p class="preco">R$ {{ formatarPreco(item.preco) }}</p>
            </div>

            <div class="item-acoes">
              <div class="quantidade-controls">
                <button @click="diminuirQuantidade(item)" :disabled="item.quantidade <= 1">-</button>
                <span class="quantidade">{{ item.quantidade }}</span>
                <button @click="aumentarQuantidade(item)">+</button>
              </div>

              <p class="subtotal">Subtotal: R$ {{ formatarPreco(item.preco * item.quantidade) }}</p>

              <button class="btn-remover" @click="removerItem(item.id)">Remover</button>
            </div>
          </div>
        </div>

        <div class="resumo">
          <h2>Resumo do Pedido</h2>
          <p style="color: red;"> Compras acima de R$ 100,00 não paga frete</p>
          <div class="resumo-linha">
            <span>Total de itens:</span>
            <span>{{ totalItens }}</span>
            <span>Frete:</span>
            <span>{{ frete.toFixed(2) }}</span>
          </div>

          <div class="resumo-linha total">
            <span>Total:</span>
            <span>R$ {{ formatarPreco(valorTotal + frete) }}</span>
          </div>

          <button class="btn-finalizar" @click="finalizarCompra">Finalizar Compra</button>

          <router-link to="/" class="btn-continuar-comprando">Continuar Comprando</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSacolaStore } from '../stores/sacolaStore';

const router = useRouter();
const sacolaStore = useSacolaStore();

const itens = computed(() => sacolaStore.itens);
const totalItens = computed(() => sacolaStore.totalItens);
const valorTotal = computed(() => sacolaStore.valorTotal);

const frete = computed(() => valorTotal.value >= 100 ? 0 : 15);

const formatarPreco = (preco) => {
  return preco.toFixed(2).replace('.', ',');
};

const aumentarQuantidade = (item) => {
  sacolaStore.atualizarQuantidade(item.id, item.quantidade + 1);
};

const diminuirQuantidade = (item) => {
  if (item.quantidade > 1) {
    sacolaStore.atualizarQuantidade(item.id, item.quantidade - 1);
  }
};

const removerItem = (itemId) => {
  sacolaStore.removerItem(itemId);
};

const finalizarCompra = () => {
  router.push('/checkout/endereco');
};
</script>

<style scoped>
.sacola {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
}

.sacola-container {
  max-width: 1200px;
  margin: 0 auto;
}

.titulo {
  text-align: center;
  color: #1a1a1a;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.vazio {
  text-align: center;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.vazio p {
  font-size: 1.2rem;
  color: #666666;
  margin-bottom: 2rem;
}

.btn-continuar {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #d4af37;
  color: #1a1a1a;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-continuar:hover {
  background-color: #c49b2a;
}

.sacola-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.itens-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-imagem {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.item-imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info h3 {
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.item-info .categoria {
  color: #666666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.item-info .preco {
  color: #d4af37;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

.item-acoes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.quantidade-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #d4af37;
  border-radius: 8px;
  overflow: hidden;
}

.quantidade-controls button {
  width: 35px;
  height: 35px;
  border: none;
  background-color: #d4af37;
  color: #1a1a1a;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantidade-controls button:hover:not(:disabled) {
  background-color: #c49b2a;
}

.quantidade-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantidade-controls .quantidade {
  width: 50px;
  text-align: center;
  font-weight: 600;
  background-color: #ffffff;
}

.subtotal {
  color: #1a1a1a;
  font-weight: 600;
  margin: 0;
}

.btn-remover {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remover:hover {
  background-color: #e74c3c;
  color: #ffffff;
}

.resumo {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.resumo h2 {
  color: #1a1a1a;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.resumo-linha {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666666;
}

.resumo-linha.total {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1a1a1a;
  padding-top: 1rem;
  border-top: 2px solid #f5f5f5;
  margin-top: 1rem;
}

.resumo-linha.total span:last-child {
  color: #d4af37;
}

.btn-finalizar {
  width: 100%;
  padding: 1rem;
  background-color: #d4af37;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1.5rem;
}

.btn-finalizar:hover {
  background-color: #c49b2a;
}

.btn-continuar-comprando {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #666666;
  text-decoration: none;
  transition: color 0.3s;
}

.btn-continuar-comprando:hover {
  color: #d4af37;
}

@media (max-width: 968px) {
  .sacola-content {
    grid-template-columns: 1fr;
  }

  .resumo {
    position: static;
  }

  .item-card {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
  }

  .item-acoes {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

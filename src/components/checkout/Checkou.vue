<template>
  <div class="checkout">
    <div class="checkout-container">
      <h1 class="titulo">Checkout</h1>

      <div class="checkout-steps">
        <div class="step" :class="{ active: $route.name === 'checkout-endereco', completed: hasEndereco }">
          <div class="step-number">1</div>
          <div class="step-label">Endereço</div>
        </div>
        <div class="step-line"></div>
        <div class="step" :class="{ active: $route.name === 'checkout-pagamento', completed: hasPagamento }">
          <div class="step-number">2</div>
          <div class="step-label">Pagamento</div>
        </div>
        <div class="step-line"></div>
        <div class="step" :class="{ active: $route.name === 'checkout-confirmacao' }">
          <div class="step-number">3</div>
          <div class="step-label">Confirmação</div>
        </div>
      </div>

      <div class="checkout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCheckoutStore } from '@/stores/checkoutStore';

const checkoutStore = useCheckoutStore();

const hasEndereco = computed(() => !!checkoutStore.endereco);
const hasPagamento = computed(() => !!checkoutStore.pagamento);
</script>

<style scoped>
.checkout {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
}

.titulo {
  text-align: center;
  color: #1a1a1a;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.checkout-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.step.active {
  opacity: 1;
}

.step.completed {
  opacity: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d4af37;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.step.completed .step-number {
  background-color: #28a745;
  color: white;
}

.step-label {
  font-size: 0.9rem;
  color: #1a1a1a;
  font-weight: 500;
  text-align: center;
}

.step-line {
  width: 60px;
  height: 2px;
  background-color: #d4af37;
  margin: 0 1rem;
}

.checkout-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .checkout-steps {
    flex-direction: column;
    gap: 1rem;
  }

  .step-line {
    width: 2px;
    height: 40px;
    margin: 0;
  }
}
</style>

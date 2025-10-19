<template>
  <div class="checkout-container">
    <div class="check">
      <h1>Finalizar Compra</h1>
      <Checkout />
    </div>
  </div>
</template>

<script setup>
import Checkout from '../componentes/checkout/Checkout.vue';
</script>

<style scoped>
.checkout-container{
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 100px;
  min-height: 100vh;
  

}
.check {
  background-color: #FEDE8B;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}
</style>

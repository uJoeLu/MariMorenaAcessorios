<template>
  <div class="confirmacao-container">
    <div class="header">
      <font-awesome-icon :icon="['fas', 'check-circle']" class="success-icon" />
      <h2>Obrigado pelo seu pedido!</h2>
    </div>

    <div v-if="pedido.formaPagamento === 'pix'" class="payment-section">
      <h3><font-awesome-icon :icon="['fas', 'qrcode']" /> Pagamento com Pix</h3>
      <p>Para finalizar sua compra, faça um Pix para a chave: <strong>(81) 99399-5306</strong> ou para o Pix Code a baixo</p>
      <div style="text-align: center; margin-top: 20px; justify-items: center;">
        <h3>R$ {{ total.toFixed(2) }}</h3>
        <img src="/src/assets/PixCode - MariMorena.png" alt="QR Code Pix" />
      </div>
      <p>Após o pagamento, nos envie o comprovante pelo WhatsApp para agilizarmos a confirmação.</p>
      <a href="https://wa.me/5581993995306" target="_blank">
        <button style="margin-top: 10px; padding: 10px 20px; background-color: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Enviar Comprovante pelo WhatsApp
        </button>
      </a>
    </div>

    <div v-else-if="pedido.formaPagamento === 'boleto'" class="payment-section">
      <h3><font-awesome-icon :icon="['fas', 'file-invoice-dollar']" /> Pagamento com Boleto</h3>
      <p>Geramos o seu boleto! Ele será enviado para o seu e-mail.</p>
      <p>A confirmação pode levar até 2 dias úteis após o pagamento.</p>
    </div>

    <div v-else-if="pedido.formaPagamento === 'cartao'" class="payment-section">
      <h3><font-awesome-icon :icon="['fas', 'credit-card']" /> Pagamento com Cartão de Crédito</h3>
      <p>Seu pedido foi recebido e está aguardando a confirmação do pagamento pela operadora.</p>
      <p>Você receberá um e-mail com a confirmação assim que for aprovado.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pedido: Object,
  total: Number
});
</script>

<style scoped>
.confirmacao-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header {
  margin-bottom: 30px;
}

.success-icon {
  font-size: 3rem;
  color: #4CAF50;
  margin-bottom: 10px;
}

h2 {
  color: #2B2B2B;
  font-size: 2rem;
  margin: 0;
}

.payment-section {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  border-left: 5px solid #FEDE8B;
  text-align: left;
}

h3 {
  color: #c2185b;
  font-size: 1.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

h3 svg {
  color: #FEDE8B;
}

p {
  color: #2B2B2B;
  line-height: 1.6;
  margin: 10px 0;
}

strong {
  color: #c2185b;
}
</style>

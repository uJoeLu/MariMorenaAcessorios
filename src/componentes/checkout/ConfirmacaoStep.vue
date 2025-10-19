<template>
  <div>
    <h2>Obrigado pelo seu pedido!</h2>

    <div v-if="pedido.formaPagamento === 'pix'">
      <h3>Pagamento com Pix</h3>
      <p>Para finalizar sua compra, faça um Pix para a chave: <strong>(XX) XXXXX-XXXX</strong></p>
      <p>Após o pagamento, nos envie o comprovante pelo WhatsApp para agilizarmos a confirmação.</p>
    </div>

    <div v-else-if="pedido.formaPagamento === 'boleto'">
      <h3>Pagamento com Boleto</h3>
      <p>Geramos o seu boleto! Ele será enviado para o seu e-mail.</p>
      <p>A confirmação pode levar até 2 dias úteis após o pagamento.</p>
    </div>

    <div v-else-if="pedido.formaPagamento === 'cartao'">
      <h3>Pagamento com Cartão de Crédito</h3>
      <p>Seu pedido foi recebido e está aguardando a confirmação do pagamento pela operadora.</p>
      <p>Você receberá um e-mail com a confirmação assim que for aprovado.</p>
    </div>

  </div>
</template>

<script setup>
defineProps({
  pedido: Object
});
</script>
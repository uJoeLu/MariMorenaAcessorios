<template>
  <tr>
    <td>{{ pedido.id }}</td>

    <td>
      <div class="produto-info">
        <img
          v-if="firstItem?.produto?.imagens?.[0]?.url"
          :src="firstItem.produto.imagens[0].url"
          :alt="firstItem.produto.nome"
          class="produto-imagem"
        />
        <span>{{ firstItem?.produto?.nome || 'Produto removido' }}</span>
      </div>
    </td>

    <td>
      <span :class="`status status-${pedido.status}`">
        {{ getStatusLabel(pedido.status) }}
      </span>
    </td>

    <td>{{ pedido.itens?.length || 0 }}</td>

    <td>
      <button class="btn-detalhes" @click="$emit('ver-detalhes', pedido)">
        Ver Detalhes
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pedido: Object
});

const firstItem = computed(() => props.pedido?.itens?.[0] || null);

const getStatusLabel = (status) => {
  const labels = {
    pendente: "Pendente",
    processando: "Processando",
    enviado: "Enviado",
    entregue: "Entregue",
    cancelado: "Cancelado",
  };
  return labels[status] || status;
};
</script>

<style scoped>
.produto-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.produto-imagem {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.btn-detalhes {
  padding: 0.5rem 1rem;
  background-color: #d4af37;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-detalhes:hover {
  background-color: #c49b2a;
}
</style>

<template>
  <div class="busca-container">
    <input
      type="text"
      v-model="buscar"
      placeholder="Buscar produtos..."
      class="busca-input"
    />
  </div>
</template>

<script setup>
import { useFiltros } from '@/composable/Filtros.js';

const { buscar } = useFiltros();
</script>

<style scoped>
.busca-container {
  margin-bottom: 20px;
}

.busca-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s;
}

.busca-input:focus {
  border-color: #FEDE8B;
}
</style>

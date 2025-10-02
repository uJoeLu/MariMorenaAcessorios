import { ref } from 'vue';

// 1. A LISTA DA SACOLA PERMANECE AQUI, FORA DE QUALQUER COMPONENTE
const sacola = ref([]);
const adicionarNaSacola = (produto) => {
    const itemExistente = sacola.value.find(item => item.id === produto.id);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        sacola.value.push({ ...produto, quantidade: 1 });
    }
};
const diminuirQtd = (produtoId) => {
    const itemExistente = sacola.value.find(item => item.id === produtoId);
    if (itemExistente) {
        if (itemExistente.quantidade > 1) {
            itemExistente.quantidade -= 1;
        } else {
            sacola.value = sacola.value.filter(item => item.id !== produtoId);
        }
    }
};
export function useSacola() {
    return { sacola, adicionarNaSacola, diminuirQtd };
}
import { ref, computed } from 'vue';
import { useProdutos } from '@/store/Produtos.js';

const categoriasSelecionadas = ref('Todas');
const categorias = ref([
    "Todas",
    "Anel",
    "Bracelete",
    "Brinco",
    "Colar",
    "Conjunto",
    "Pulseira",
    "Tiara"
]);
const ordenacaoSelecionada = ref('lancamentos');
const ordenacoes = ref([
    { value: 'lancamentos', label: 'Lançamentos' },
    { value: 'menor-preco', label: 'Preço: Menor para Maior' },
    { value: 'maior-preco', label: 'Preço: Maior para Menor' },
    { value: 'nome-az', label: 'Nome: A-Z' },
    { value: 'nome-za', label: 'Nome: Z-A' }
]);
const buscar = ref('');

const produtosOrdenados = computed(() => {
    const produtosStore = useProdutos();
    let listaBase = produtosStore.produtos;

    if (buscar.value.trim() !== '') {
        listaBase = listaBase.filter(produto =>
            produto.nome.toLowerCase().includes(buscar.value.toLowerCase()) ||
            produto.descricao.toLowerCase().includes(buscar.value.toLowerCase())
        );
    }

    if (categoriasSelecionadas.value !== 'Todas') {
        listaBase = listaBase.filter(produto =>
            produto.categoria === categoriasSelecionadas.value
        );
    }

    const listaParaOrdenar = [...listaBase];

    switch (ordenacaoSelecionada.value) {
        case 'lancamentos':
            return listaParaOrdenar.sort((a, b) => b.id - a.id);
        case 'menor-preco':
            return listaParaOrdenar.sort((a, b) => a.preco - b.preco);

        case 'maior-preco':
            return listaParaOrdenar.sort((a, b) => b.preco - a.preco);

        case 'nome-az':
            return listaParaOrdenar.sort((a, b) => a.nome.localeCompare(b.nome));

        case 'nome-za':
            return listaParaOrdenar.sort((a, b) => b.nome.localeCompare(a.nome));

        default:
            return listaParaOrdenar;
    }
});
export function useFiltros() {
    return { categorias, categoriasSelecionadas, ordenacoes, ordenacaoSelecionada, buscar, produtosOrdenados };
}

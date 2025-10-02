import { ref, computed } from 'vue';
import { useProdutos } from '@/composables/Produtos.js';

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
const ordenacaoSelecionada = ref('Menor Preço');
const ordenacoes = ref([
    { value: 'menor-preco', label: 'Preço: Menor para Maior' },
    { value: 'maior-preco', label: 'Preço: Maior para Menor' },
    { value: 'nome-az', label: 'Nome: A-Z' },
    { value: 'nome-za', label: 'Nome: Z-A' }
]);
const { produtos } = useProdutos();

const produtosOrdenados = computed(() => {
    let listaBase = produtos.value; 
    
    if (categoriasSelecionadas.value !== 'Todas') {
        listaBase = listaBase.filter(produto => 
            produto.categoria === categoriasSelecionadas.value
        );
    }

    const listaParaOrdenar = [...listaBase]; 
    
    switch (ordenacaoSelecionada.value) {
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
    return { categorias, categoriasSelecionadas, ordenacoes, ordenacaoSelecionada, produtosOrdenados };
}
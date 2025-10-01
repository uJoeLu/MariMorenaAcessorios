<template>

    <body>
        <div class="car">
            <Carrossel />
        </div>
        <h1 class="text-2xl font-bold mb-4">Catálogo</h1>
        <div class="espaco">
            <div class="filtros">
                <h2>Filtros</h2>
                <h3>Categorias</h3>
                <select class="dropdown" v-model="categoriaSelecionada">
                    <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                        {{ categoria }}
                    </option>
                </select>
            </div>
            <div class="cartoes-produtos">
                <div class="cartoes-produtos cartao">
                    <CartaoProduto v-for="item in produtosOrdenados" :key="item.id" :produto="item"
                    @adicionar-a-sacola="adicionarNaSacola" />
                </div>
            </div>
            <div class="ordenar">
                <h3>Ordenar por:</h3>
                <select class="ordenar por" v-model="ordenacaoSelecionada" >
                    <option v-for="opcao in ordenacoes" :key="opcao.value" :value="opcao.value">
                        {{ opcao.label }}
                    </option>
                </select>
            </div>
        </div>
    </body>
</template>
<script setup>
import { ref } from 'vue';
import Carrossel from '@/componentes/Carrossel.vue';
import CartaoProduto from '@/componentes/CartaoProduto.vue';
import { computed } from 'vue';

const ordenacaoSelecionada = ref('nome-az');
const ordenacoes = ref([
    { value: 'menor-preco', label: 'Preço: Menor para Maior' },
    { value: 'maior-preco', label: 'Preço: Maior para Menor' },
    { value: 'nome-az', label: 'Nome: A-Z' },
    { value: 'nome-za', label: 'Nome: Z-A' }
]);
const produtosOrdenados = computed(() => {
    let listaBase = produtos.value;
    if (categoriaSelecionada.value !== 'Todos') {
        listaBase = listaBase.filter(produto => 
            produto.categoria === categoriaSelecionada.value
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
const produtos = ref([
    { id: 1, nome: "Brinco Dourado", preco: 25, quantidade: 10, categoria: "brinco", imagem: "https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-gota-vazada-1757365878.3214.jpg" },
    { id: 2, nome: "Colar de Pérolas", preco: 40, quantidade: 10, categoria: "Colar", imagem: "https://febijus.bwimg.com.br/febijus/produtos/colar-triplo-folheado-a-ouro-18k-e-prata-perolas--esferas-e-placas-circulares-1757446852.4441.jpg" },
    { id: 3, nome: "Pulseira Dourada", preco: 30, quantidade: 10, categoria: "Pulseira", imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-aro-folheado-a-prata-dois-fios-duplos-1758060165.6218.jpg" },
    { id: 7, nome: "Anel de Prata", preco: 20, quantidade: 10, categoria: "Anel", imagem: "https://febijus.bwimg.com.br/febijus/produtos/anel-folheado-a-ouro-18k-e-prata-enrolado-1754996511.9469.jpg" },
    { id: 8, nome: "Anel Dourado", preco: 20, quantidade: 10, categoria: "Anel", imagem: "https://febijus.bwimg.com.br/febijus/produtos/anel-folheado-a-ouro-18k-e-prata-vazado-1754396541.4854.jpg" },
    { id: 9, nome: "Anel de gatinho e coração", preco: 30, quantidade: 10, categoria: "Anel", imagem: "https://febijus.bwimg.com.br/febijus/produtos/anel-semi-joia-gatinho-e-coracao-com-ponto-de-luz-1744760268.3022.jpg" },
    { id: 10, nome: "Conjunto Colar e Brinco", preco: 50, quantidade: 10, categoria: "Conjunto", imagem: "https://febijus.bwimg.com.br/febijus/produtos/conjunto-colar-e-brinco-folheado-a-ouro-18k-coracao-texturizado-1756232619.379.jpg" },
    { id: 11, nome: "Conjunto Colar e Brinco", preco: 45, quantidade: 10, categoria: "Conjunto", imagem: "https://febijus.bwimg.com.br/febijus/produtos/conjunto-colar-e-brinco-folheado-a-ouro-18k-e-prata-max-botton-1758661935.4903.jpg" },
    { id: 12, nome: "Tiara Rosa com Stitch e Sorvete", preco: 15, quantidade: 10, categoria: "Tiara", imagem: "https://febijus.bwimg.com.br/febijus/produtos/tiara-rosa-com-stitch-e-sorvetinho-1740408338.1134.jpg" },
    { id: 13, nome: "Tiara Rosa com a Capivara", preco: 15, quantidade: 10, categoria: "Tiara", imagem: "https://febijus.bwimg.com.br/febijus/produtos/tiara-rosa-com-capivara-1740407873.1204.jpg" },
    { id: 14, nome: "Brinco de Coração", preco: 20, quantidade: 10, categoria: "Brinco", imagem: "https://febijus.bwimg.com.br/febijus/produtos/brinco-folheado-a-ouro-18k-e-prata-coracao-resinado-1758655850.0005.jpg" },
    { id: 15, nome: "Colar com Pingente Gota Longa", preco: 35, quantidade: 10, categoria: "Colar", imagem: "https://febijus.bwimg.com.br/febijus/produtos/colar-folheado-a-ouro-18k-pingente-gota-longa-1749558255.5448.jpg" },
    { id: 16, nome: "Pulseira Folheada a Ouro 18k Fio Torcido", preco: 25, quantidade: 10, categoria: "Pulseira", imagem: "https://febijus.bwimg.com.br/febijus/produtos/pulseira-folheada-a-ouro-18k-fio-torcido-e-inspiracao-vg-preto-1758564353.1998.jpg" },
    { id: 17, nome: "Bracelete Aço Inoxidavel", preco: 30, quantidade: 10, categoria: "Bracelete", imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-folheado-a-ouro-18k-inspiracao-grandes-marcas-1758658323.0727.jpg" },
    { id: 18, nome: "Bracelete Folheado", preco: 40, quantidade: 10, categoria: "Bracelete", imagem: "https://febijus.bwimg.com.br/febijus/produtos/bracelete-folheado-a-ouro-18k-e-prata-design-liso-maxi-1758652465.7533.jpg" }
]);
const sacola = ref([]);

function adicionarNaSacola(produto) {
    sacola.value.push(produto);
    console.log(sacola.value);
}
const categoriaSelecionada = ref('Todos');

const categorias = ref([
    'Todos',
    'Anel',
    'Bracelete',
    'Brinco',
    'Colar',
    'Pulseira',
    'Conjunto',
    'Tiara'
]);


</script>
<style scoped>
body {
    margin: auto;
    padding: 0;
    width: 100vw;
    display: grid;
    min-height: 100vh;
}
.espaco {
    display: flex;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    justify-content: center;
    align-items: flex-start;
    max-width: 1200px;
    margin: auto;
    width: 100%;
}

.filtros {
    align-items: flex-start; 
    padding: 20px;
    background-color: #2B2B2B;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    min-width: 200px; 
    box-sizing: border-box;
    font-size: 21px;
    margin-right: 30px;
    position: relative;

}

.filtros h2 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 28px;
    color: #FEDE8B;
}

.filtros h3 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 24px;
    color: #FEDE8B;
}


.filtros .dropdown {
    display: block;
    background-color: #2B2B2B;
    color: #FEDE8B;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 21px;
}

.filtros .dropdown-menu {
    margin-top: 5px;
    background-color: #2B2B2B;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    width: 180px;
    left: auto;
}
.filtros .dropdown-item {
    padding: 10px;
    cursor: pointer;
    text-align: left;
    color: #FEDE8B;
    text-decoration: none;
    font-size: 18px;
}

.car {
    display: flex;
    top: 0;
    left: 100%;
    right: 100%;
}

.cartoes-produtos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    margin-top: 20px;
    color: #FEDE8B;
}
</style>
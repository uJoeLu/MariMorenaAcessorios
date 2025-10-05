<template>

    <div class="catalogo-page">
        <div class="car">
            <Carrossel />
        </div>
        <h1 class="text-2xl font-bold mb-4">Catálogo</h1>
        <div class="espaco">
            <div class="filtro-categorias">
                <h2>Filtros</h2>
                <h3>Categorias</h3>
                <select class="dropdown" v-model="categoriasSelecionadas">
                    <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                        {{ categoria }}
                    </option>
                </select>
            </div>
            <div class="cartoes-produtos">
                <div class="cartoes-produtos cartao">
                    <CartaoProduto v-for="item in produtosOrdenados" :key="item.id" :produto="item"/>
                </div>
            </div>
            <div class="filtro-ordenacao">
                <h3>Ordenar por:</h3>
                <select class="dropdown" v-model="ordenacaoSelecionada" >
                    <option v-for="opcao in ordenacoes" :key="opcao.value" :value="opcao.value">
                        {{ opcao.label }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
<script setup>
import Carrossel from '@/componentes/Carrossel.vue';
import CartaoProduto from '@/componentes/CartaoProduto.vue';
import { useFiltros } from '@/composable/Filtros';

const { categoriasSelecionadas, categorias, ordenacaoSelecionada, ordenacoes, produtosOrdenados } = useFiltros();

</script>
<style scoped>
.catalogo-page {
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

.filtro-categorias {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #2B2B2B;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: fit-content;
}

.filtro-categorias h2 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 28px;
    color: #FEDE8B;
}

.filtro-categorias h3 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 24px;
    color: #FEDE8B;
}

.filtro-categorias .dropdown {
    display: block;
    background-color: #2B2B2B;
    color: #FEDE8B;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 21px;
}
.filtro-ordenacao {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #2B2B2B;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: fit-content;
}
.filtro-ordenacao h3 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 24px;
    color: #FEDE8B;
}
.filtro-ordenacao .dropdown {
    background-color: #2B2B2B;
    color: #FEDE8B;
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
    max-width: 1200px;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    margin-top: 20px;
    color: #FEDE8B;
}

@media (max-width: 768px) {
    .espaco {
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }

    .filtro-categorias,
    .filtro-ordenacao {
        width: 100%;
        max-width: 400px;
    }

    .cartoes-produtos {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
    }

    h1 {
        font-size: 1.5rem;
    }
}
</style>

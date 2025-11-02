// /src/composable/useCepApi.js

import { ref } from 'vue';

// Estado de feedback que o componente vai consumir
const loading = ref(false);
const erro = ref(null);

// Função de busca que aceita o CEP como argumento (string)
async function buscarEndereco(cepString) {
    erro.value = null;
    loading.value = true;

    // Limpa o CEP
    const cepLimpo = cepString.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        const msg = 'CEP deve ter 8 dígitos.';
        erro.value = msg;
        loading.value = false;
        setTimeout(() => { erro.value = null; }, 1000);
        throw new Error(msg);
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
            const msg = 'CEP inválido ou não encontrado.';
            erro.value = msg;
            throw new Error(msg);
        }

        // Retorna os dados para o componente (que vai preencher o novoEndereco)
        return {
            cidade: data.localidade,
            estado: data.uf
        };

    } catch (e) {
        // Captura erros de rede ou outros
        erro.value = e.message;
        throw e;
    } finally {
        loading.value = false;
    }
}

// O Composable: exporta o estado de feedback e a função de busca
export function useCepApi() {
    return {
        erro,
        loading,
        buscarEndereco
    };
}

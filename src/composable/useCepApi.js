import { ref } from 'vue';

const loading = ref(false);
const erro = ref(null);

async function buscarEndereco(cepString) {
    erro.value = null;
    loading.value = true;

    const cepLimpo = cepString.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        const msg = 'CEP deve ter 8 dígitos.';
        erro.value = msg;
        loading.value = false;
        setTimeout(() => { erro.value = null; }, 2000);
        throw new Error(msg);
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
            const msg = 'CEP inválido ou não encontrado.';
            erro.value = msg;
            loading.value = false;
            setTimeout(() => { erro.value = null; }, 2000);
            throw new Error(msg);
        }

        return {
            cidade: data.localidade,
            estado: data.uf
        };

    } catch (e) {
        // Captura erros de rede ou outros
        erro.value = e.message;
        loading.value = false;
        setTimeout(() => { erro.value = null; }, 2000);
        throw e;
    } 
}

export function useCepApi() {
    return {
        erro,
        loading,
        buscarEndereco
    };
}

<template>
  <div class="atualizar-produto">
    <h1>Atualizar produto</h1>
    <p>Edite as informações do produto selecionado.</p>

    <div class="form-panel">
      <form @submit.prevent="salvarProduto">
        <section class="form-section">
          <h2>Informações do acessório</h2>

          <div class="form-group">
            <label for="nome">Nome do produto</label>
            <input id="nome" v-model="produto.nome" type="text" required />
          </div>

          <div class="form-group">
            <label for="preco">Preço</label>
            <input id="preco" v-model.number="produto.preco" type="number" step="0.01" required />
          </div>

          <div class="form-group">
            <label for="categoria">Categorias</label>
            <select id="categoria" v-model="produto.categoria" required>
              <option value="">Selecione uma categoria</option>
              <option value="Anéis">Anéis</option>
              <option value="Brincos">Brincos</option>
              <option value="Colares">Colares</option>
              <option value="Conjuntos">Conjuntos</option>
              <option value="Pulseiras">Pulseiras</option>
              <option value="Tiaras">Tiaras</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea id="descricao" v-model="produto.descricao" rows="4" required></textarea>
          </div>

          <div class="form-group">
            <label for="ativo">
              <input id="ativo" v-model="produto.ativo" type="checkbox" />
              Produto ativo
            </label>
          </div>
        </section>

        <section class="form-section">
          <h2>Mídia e imagens</h2>

          <div v-if="imagensExistentes.length > 0" class="imagens-existentes">
            <h3>Imagens atuais:</h3>
            <div class="imagens-grid">
              <div v-for="(imagem, index) in imagensExistentes" :key="index" class="imagem-item">
                <img :src="imagem" alt="Imagem do produto" />
                <button type="button" @click="removerImagemExistente(index)">Remover</button>
              </div>
            </div>
          </div>

          <div class="upload-area" @dragover.prevent @drop.prevent="onDrop" @click="$refs.fileInput.click()">
            <div class="upload-content">
              <i class="fas fa-camera"></i>
              <p>Clique para fazer upload ou arraste e solte</p>
              <p class="upload-formats">Formatos suportados: png, jpg, webp, mp4</p>
            </div>
            <input ref="fileInput" type="file" multiple accept=".png,.jpg,.jpeg,.webp,.mp4" @change="onFileChange"
              style="display: none;" />
          </div>

          <div v-if="arquivosNovos.length > 0" class="file-list">
            <h3>Novos arquivos selecionados:</h3>
            <ul>
              <li v-for="(arquivo, index) in arquivosNovos" :key="index">
                {{ arquivo.name }}
                <button type="button" @click="removerArquivoNovo(index)">Remover</button>
              </li>
            </ul>
          </div>
        </section>

        <div class="form-actions">
          <button type="button" @click="cancelarEdicao" class="btn-secondary">Cancelar edição</button>
          <button type="button" @click="desabilitarProduto" class="btn-warning">Desabilitar produto</button>
          <button type="button" @click="excluirProduto" class="btn-danger">Excluir</button>
          <button type="submit" class="btn-primary">Salvar alterações</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { produtoService } from '@/services/produtoService';
import { storageService } from '@/services/storageService';

const route = useRoute();
const router = useRouter();

const produto = ref({
  nome: '',
  preco: null,
  categoria: '',
  descricao: '',
  ativo: true
});

const imagensExistentes = ref([]);
const arquivosNovos = ref([]);
const fileInput = ref(null);

onMounted(async () => {
  const produtoId = route.params.id;
  try {
    const produtoData = await produtoService.buscarPorId(produtoId);
    produto.value = {
      nome: produtoData.nome || '',
      preco: produtoData.preco || null,
      categoria: produtoData.categoria || '',
      descricao: produtoData.descricao || '',
      ativo: produtoData.ativo !== false // assume true if not set
    };
    imagensExistentes.value = produtoData.imagens || [];
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    alert('Erro ao carregar produto: ' + error.message);
    router.push('/admin/produtos');
  }
});

const onFileChange = (event) => {
  const files = Array.from(event.target.files);
  arquivosNovos.value.push(...files);
};

const onDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  arquivosNovos.value.push(...files);
};

const removerArquivoNovo = (index) => {
  arquivosNovos.value.splice(index, 1);
};

const removerImagemExistente = async (index) => {
  const produtoId = route.params.id;
const imagem = imagensExistentes.value[index];

  try {
    await storageService.deletarImagem(imagem.path); 
    imagensExistentes.value.splice(index, 1);
    await produtoService.atualizar(produtoId, {imagens: imagensExistentes.value});
  } catch (error) {
    console.error('Erro ao remover imagem:', error);
    alert('Erro ao remover imagem: ' + error.message);
  }
};

const salvarProduto = async () => {
  const produtoId = route.params.id;
  try {
    const novasImagens = []; 
    for (const arquivo of arquivosNovos.value) {
      const imagemData = await storageService.uploadImagemProduto(arquivo, produtoId); 
      novasImagens.push(imagemData);
    }
    const todasImagens = [...imagensExistentes.value, ...novasImagens]; 
    const dadosAtualizados = {
      ...produto.value,
      imagens: todasImagens
    };
    await produtoService.atualizar(produtoId, dadosAtualizados);
    alert('Produto atualizado com sucesso!');
    router.push('/admin/produtos');
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    alert('Erro ao salvar produto: ' + error.message);
  }
};

const cancelarEdicao = () => {
  router.go(-1);
};

const desabilitarProduto = async () => {
  const produtoId = route.params.id;
  try {
    await produtoService.atualizar(produtoId, { ativo: false });
    produto.value.ativo = false;
    alert('Produto desabilitado com sucesso!');
  } catch (error) {
    console.error('Erro ao desabilitar produto:', error);
    alert('Erro ao desabilitar produto: ' + error.message);
  }
};

const excluirProduto = async () => {
  if (confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
    const produtoId = route.params.id;
    try {
      for (const imagem of imagensExistentes.value) { 
        await storageService.deletarImagem(imagem.path); // ⬅️ USAR image.path
      }
      await produtoService.deletar(produtoId);
      alert('Produto excluído com sucesso!');
      router.push('/admin/produtos');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto: ' + error.message);
    }
  }
};
</script>

<style scoped>
.atualizar-produto {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-panel {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 30px;
}

.form-section h2 {
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.imagens-existentes {
  margin-bottom: 20px;
}

.imagens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.imagem-item {
  position: relative;
}

.imagem-item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.imagem-item button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.upload-area:hover {
  border-color: #999;
}

.upload-content i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 10px;
}

.upload-formats {
  font-size: 12px;
  color: #666;
}

.file-list {
  margin-top: 20px;
}

.file-list ul {
  list-style: none;
  padding: 0;
}

.file-list li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.form-actions {
  text-align: right;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary,
.btn-warning,
.btn-danger {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-warning {
  background: #ffc107;
  color: black;
}

.btn-danger {
  background: #dc3545;
  color: white;
}
</style>

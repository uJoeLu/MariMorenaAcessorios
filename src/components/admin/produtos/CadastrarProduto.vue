<template>
  <div class="cadastrar-produto">
    <h1>Cadastrar novo produto</h1>
    <p>Preencha as informações para cadastrar um novo acessório no catálogo.</p>

    <div class="form-panel">
      <form @submit.prevent="salvarProduto">
        <!-- Seção A: Informações do acessório -->
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
            <label for="quantidade">Preço</label>
            <input id="quantidade" v-model.number="produto.quantidade" type="number" step="0.01" required />
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
        </section>

        <section class="form-section">
          <h2>Mídia e imagens</h2>

          <div class="upload-area" @dragover.prevent @drop.prevent="onDrop" @click="$refs.fileInput.click()">
            <div class="upload-content">
              <i class="fas fa-camera"></i>
              <p>Clique para fazer upload ou arraste e solte</p>
              <p class="upload-formats">Formatos suportados: png, jpg, webp, mp4</p>
            </div>
            <input ref="fileInput" type="file" multiple accept=".png,.jpg,.jpeg,.webp,.mp4" @change="onFileChange"
              style="display: none;" />
          </div>

          <div v-if="arquivos.length > 0" class="file-list">
            <h3>Arquivos selecionados:</h3>
            <ul>
              <li v-for="(arquivo, index) in arquivos" :key="index">
                {{ arquivo.name }}
                <button type="button" @click="removerArquivo(index)">Remover</button>
              </li>
            </ul>
          </div>
        </section>

        <div class="form-actions">
          <button type="button" @click="limparFormulario" class="btn-secondary">Limpar</button>
          <button type="submit" class="btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { produtoService } from '@/services/produtoService';
import { storageService } from '@/services/storageService';

const produto = ref({
  nome: '',
  preco: null,
  categoria: '',
  quantidade: null,
  descricao: ''
});

const arquivos = ref([]);
const fileInput = ref(null);

const onFileChange = (event) => {
  const files = Array.from(event.target.files);
  arquivos.value.push(...files);
};

const onDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  arquivos.value.push(...files);
};

const removerArquivo = (index) => {
  arquivos.value.splice(index, 1);
};

const salvarProduto = async () => {
  try {
    const novoProduto = {
      ...produto.value,
      imagens: []
    };

    const produtoCriado = await produtoService.criar(novoProduto); // produtoCriado terá o ID

    const imagensParaAtualizar = [];

    for (const arquivo of arquivos.value) {
      const { url } = await storageService.uploadImagemProduto(
        arquivo,
        produtoCriado.id
      );

      imagensParaAtualizar.push(url);
    }

    await produtoService.atualizar(produtoCriado.id, { imagens: imagensParaAtualizar });

    alert('Produto cadastrado com sucesso!');
    limparFormulario();
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    alert('Erro ao salvar produto: ' + error.message);
  }
};

const limparFormulario = () => {
  produto.value = {
    nome: '',
    preco: null,
    categoria: '',
    descricao: ''
  };
  arquivos.value = [];
};
</script>

<style scoped>
.cadastrar-produto {
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
.btn-secondary {
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
</style>

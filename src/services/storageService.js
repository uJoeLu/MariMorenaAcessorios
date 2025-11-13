import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase/config'; 

export const storageService = {
  async uploadImagem(file, caminho) {
    try {
      const storageRef = ref(storage, caminho);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw new Error('Não foi possível fazer upload da imagem');
    }
  },
  async uploadFotoUsuario(file, usuarioId){
    const timestamp = Date.now();
    const nomeArquivo = `${usuarioId}_${timestamp}_${file.name}`;
    const caminho = `usuarios/${usuarioId}/${nomeArquivo}`;

    const url = await this.uploadImagem(file, caminho);

    return {url, caminho};
  },

  async uploadImagemProduto(file, produtoId) {
    const timestamp = Date.now();
    const nomeArquivo = `${produtoId}_${timestamp}_${file.name}`;
    const caminho = `produtos/${produtoId}/${nomeArquivo}`;

    const url = await this.uploadImagem(file, caminho);

    return {url, caminho};
  },

  async deletarImagem(caminhoCompleto) {
    try {
      const storageRef = ref(storage, caminhoCompleto);
      await deleteObject(storageRef);
      return true;
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      throw new Error('Não foi possível deletar a imagem');
    }
  },

  async getImagemURL(caminho) {
    try {
      const storageRef = ref(storage, caminho);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Erro ao obter URL da imagem:', error);
      throw new Error('Não foi possível obter a URL da imagem');
    }
  }
};

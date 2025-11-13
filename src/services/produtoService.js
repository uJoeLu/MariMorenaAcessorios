import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase/config';

const COLLECTION_NAME = 'produtos';

export const produtoService = {
  async listarTodos() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw new Error('Não foi possível carregar os produtos');
    }
  },

  async buscarPorId(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  async buscarPorCategoria(categoria) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('categoria', '==', categoria));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw new Error('Não foi possível buscar os produtos');
    }
  },

  async criar(produto) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), produto);
      return { id: docRef.id, ...produto };
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new Error('Não foi possível criar o produto');
    }
  },

  async atualizar(id, dadosAtualizados) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, dadosAtualizados);
      return { id, ...dadosAtualizados };
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw new Error('Não foi possível atualizar o produto');
    }
  },

  async deletar(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw new Error('Não foi possível deletar o produto');
    }
  }
};

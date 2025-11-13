import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase/config';

const COLLECTION_NAME = 'comentarios';

export const comentarioService = {
  async listarTodos() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar comentários:', error);
      throw new Error('Não foi possível carregar os comentários');
    }
  },

  async buscarPorId(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Comentário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar comentário:', error);
      throw error;
    }
  },

  async buscarPorProduto(produtoId) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('produtoId', '==', produtoId), orderBy('dataCriacao', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar comentários por produto:', error);
      throw new Error('Não foi possível buscar os comentários');
    }
  },

  async buscarPorUsuario(userId) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId), orderBy('dataCriacao', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar comentários por usuário:', error);
      throw new Error('Não foi possível buscar os comentários');
    }
  },

  async criar(comentario) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...comentario,
        dataCriacao: new Date(),
        aprovado: comentario.aprovado || false
      });
      return { id: docRef.id, ...comentario };
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      throw new Error('Não foi possível criar o comentário');
    }
  },

  async atualizar(id, dadosAtualizados) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, dadosAtualizados);
      return { id, ...dadosAtualizados };
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
      throw new Error('Não foi possível atualizar o comentário');
    }
  },

  async deletar(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      throw new Error('Não foi possível deletar o comentário');
    }
  },

  async aprovarComentario(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { aprovado: true });
      return true;
    } catch (error) {
      console.error('Erro ao aprovar comentário:', error);
      throw new Error('Não foi possível aprovar o comentário');
    }
  },

  async reprovarComentario(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { aprovado: false });
      return true;
    } catch (error) {
      console.error('Erro ao reprovar comentário:', error);
      throw new Error('Não foi possível reprovar o comentário');
    }
  }
};

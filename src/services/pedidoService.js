import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase/config';

const COLLECTION_NAME = 'pedidos';

export const pedidoService = {
  async listarTodos() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      throw new Error('Não foi possível carregar os pedidos');
    }
  },

  async buscarPorId(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Pedido não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw error;
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
      console.error('Erro ao buscar pedidos por usuário:', error);
      throw new Error('Não foi possível buscar os pedidos');
    }
  },

  async buscarPorStatus(status) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('status', '==', status), orderBy('dataCriacao', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar pedidos por status:', error);
      throw new Error('Não foi possível buscar os pedidos');
    }
  },

  async criar(pedido) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...pedido,
        dataCriacao: new Date(),
        status: pedido.status || 'pendente'
      });
      return { id: docRef.id, ...pedido };
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Não foi possível criar o pedido');
    }
  },

  async atualizar(id, dadosAtualizados) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, dadosAtualizados);
      return { id, ...dadosAtualizados };
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw new Error('Não foi possível atualizar o pedido');
    }
  },

  async deletar(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      throw new Error('Não foi possível deletar o pedido');
    }
  }
};

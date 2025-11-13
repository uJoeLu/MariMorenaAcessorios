import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, setDoc } from 'firebase/firestore';
import { db } from './firebase/config';

const COLLECTION_NAME = 'usuarios';

export const usuarioService = {
  async listarTodos() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw new Error('Não foi possível carregar os usuários');
    }
  },

  async buscarPorId(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`Usuário com ID ${id} não encontrado`);
      }
    } catch (error) {
      console.error('Erro ao buscar por ID do usuário:', error);
      throw new Error('Falha na busca por ID do usuário');
    }
  },

  async buscarPorEmail(email) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw new Error('Não foi possível buscar o usuário');
    }
  },

  async criar(usuario, uid) {
    try {
      await setDoc(doc(db, COLLECTION_NAME, uid), usuario);
      return { id: uid, ...usuario };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  async atualizar(id, dadosAtualizados) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, dadosAtualizados);
      return { id, ...dadosAtualizados };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Não foi possível atualizar o usuário');
    }
  },

  async deletar(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw new Error('Não foi possível deletar o usuário');
    }
  }
};

import { collection, getDocs, doc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase/config';

const COLLECTION_NAME = 'favoritos';

export const favoritosService = {
  async carregarFavoritos(userId) {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async adicionarFavorito(userId, produto) {
    const favorito = {
      userId: userId,
      produtoId: produto.id,
      produto: produto,
      dataAdicionado: new Date()
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), favorito);
    return { id: docRef.id, ...favorito };
  },

  async removerFavorito(favoritoId) {
    await deleteDoc(doc(db, COLLECTION_NAME, favoritoId));
  }
};

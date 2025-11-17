import { auth } from './firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { usuarioService } from './usuarioService';
import { storageService } from './storageService';

export const authService = {
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Email ou senha incorretos');
    }
  },

  async registrar(email, password, displayName, arquivoFoto, dadosAdicionais = {}) {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
      let photoUrlFinal = '';

      await user.getIdToken(true);

      if (arquivoFoto) {
        const uploadFoto = await storageService.uploadFotoUsuario(arquivoFoto, uid);

        photoUrlFinal = uploadFoto.url;
      }

      await updateProfile(user, { displayName, photoURL: photoUrlFinal })

      const dadosFireStore = {
        email,
        displayName,
        photoURL: photoUrlFinal,
        ...dadosAdicionais,
        dataCriacao: new Date().toISOString(),
        eAdmin: false
      }

      const novoUsuario = await usuarioService.criar(dadosFireStore, uid);
      return novoUsuario;
    }catch (error){
      console.error('Erro ao registrar usuário:', error);
      throw new Error(error.message);
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw new Error('Erro ao fazer logout');
    }
  },

  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  async updateProfile(updates) {
    try {
      await updateProfile(auth.currentUser, updates);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw new Error('Erro ao atualizar perfil');
    }
  },

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
      throw new Error('Erro ao enviar email de redefinição');
    }
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  waitForUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }
};

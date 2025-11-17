import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD64WvPjP3hxnB-4h9xSD0ab4I5-r6CFjY",
  authDomain: "marimorena-acessorios.firebaseapp.com",
  projectId: "marimorena-acessorios",
  storageBucket: "marimorena-acessorios.firebasestorage.app",
  messagingSenderId: "377952572944",
  appId: "1:377952572944:web:232ba00b6325e626759c95"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
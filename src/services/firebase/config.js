import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyANWgJ--08ju5iDEQ_MSEj3vbQWnugL40I",
  authDomain: "marimorenaacessorios.firebaseapp.com",
  projectId: "marimorenaacessorios",
  storageBucket: "marimorenaacessorios.firebasestorage.app",
  messagingSenderId: "993695616857",
  appId: "1:993695616857:web:8c11543872156524fd4648",
  measurementId: "G-010FP8C9G4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

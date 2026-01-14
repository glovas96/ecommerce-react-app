import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase project credentials
const firebaseConfig = {
  apiKey: 'AIzaSyDhtWDQVKbCR-lVeEYgz1REtFbi_DM1Zks',
  authDomain: 'ecommerce-react-app-e9517.firebaseapp.com',
  projectId: 'ecommerce-react-app-e9517',
  storageBucket: 'ecommerce-react-app-e9517.firebasestorage.app',
  messagingSenderId: '170889709952',
  appId: '1:170889709952:web:47ebd707e5fab5897cd965',
};

const app = initializeApp(firebaseConfig);

// Auth clients used across the app
export const auth = getAuth(app);

// Firestore instance for data persistence
export const db = getFirestore(app);

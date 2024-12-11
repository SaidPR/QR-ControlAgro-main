import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

// Configuración de Firebase para tu app
const firebaseConfig = {
  apiKey: "AIzaSyBVaUUgwZxx2R6oINGtt7JNMv6q9Kycwe0",
  authDomain: "appqr-d7f92.firebaseapp.com",
  projectId: "appqr-d7f92",
  storageBucket: "appqr-d7f92.firebasestorage.app",
  messagingSenderId: "460840966769",
  appId: "1:460840966769:web:ef68591df4a784e192d9d0"
};

// Inicializa Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Inicializa Firebase Auth con persistencia (usando AsyncStorage)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // Establece la persistencia
});

// Inicializa Firestore
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
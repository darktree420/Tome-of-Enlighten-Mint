// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyC-EXy1_ayThtvgOE4UtvF4WEuD0eHr9VU",
  authDomain: "tomeofenlightenmint.firebaseapp.com",
  projectId: "tomeofenlightenmint",
  storageBucket: "tomeofenlightenmint.firebasestorage.app",
  messagingSenderId: "474536124183",
  appId: "1:474536124183:web:7762594a4a467cdc3a2152"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

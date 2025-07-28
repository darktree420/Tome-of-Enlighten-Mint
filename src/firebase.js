// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
     apiKey: "AIzaSyAMatTvaez5hQhc3b5DOgqTgb6j_Uk5Pa8",
  authDomain: "mystic-tome-467312.firebaseapp.com",
  projectId: "mystic-tome-467312",
  storageBucket: "mystic-tome-467312.appspot.com",
  messagingSenderId: "1083041581692",
  appId: "1:1083041581692:web:b8560598d354924b6057f9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

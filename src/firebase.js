// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
     apiKey: "AIzaSyC4lve_6uPJgogpdW8KAdCwczEVyqq_fe4",
  authDomain: "tome-of-enlighten-mint.firebaseapp.com",
  projectId: "tome-of-enlighten-mint",
  storageBucket: "tome-of-enlighten-mint.appspot.com",
  messagingSenderId: "556319817663",
  appId: "1:556319817663:web:f6f7fc025da0abdbfb2b0a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

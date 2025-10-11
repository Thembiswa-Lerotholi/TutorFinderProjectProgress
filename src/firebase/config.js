// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBi250rlVJtL6fAppvOl5cOCgv7T_y59Ps",
  authDomain: "tutorfinder-5df5a.firebaseapp.com",
  projectId: "tutorfinder-5df5a",
  storageBucket: "tutorfinder-5df5a.firebasestorage.app",
  messagingSenderId: "305155263237",
  appId: "1:305155263237:web:f6c03ef8bda3b3fc7e056c",
  measurementId: "G-10GWHWSFNN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, db, storage }; 
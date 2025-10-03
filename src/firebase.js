// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi250rlVJtL6fAppvOl5cOCgv7T_y59Ps",
  authDomain: "tutorfinder-5df5a.firebaseapp.com",
  projectId: "tutorfinder-5df5a",
  storageBucket: "tutorfinder-5df5a.firebasestorage.app",
  messagingSenderId: "305155263237",
  appId: "1:305155263237:web:f6c03ef8bda3b3fc7e056c",
  measurementId: "G-10GWHWSFNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db};

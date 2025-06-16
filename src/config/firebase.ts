import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL1RvFnFNvI7HdtxX3qjDMlZVAIZIUOGg",
  authDomain: "jinstore-15e1d.firebaseapp.com",
  projectId: "jinstore-15e1d",
  storageBucket: "jinstore-15e1d.firebasestorage.app",
  messagingSenderId: "20341917371",
  appId: "1:20341917371:web:7cbddf326e52f56fff0b9e",
  measurementId: "G-P1FTKDG9SY",
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

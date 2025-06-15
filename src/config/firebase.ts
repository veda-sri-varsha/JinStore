import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhljCa5xSgkpBrK3b9OaadWsubF67xS6c",
  authDomain: "e-store-8e8ae.firebaseapp.com",
  projectId: "e-store-8e8ae",
  storageBucket: "e-store-8e8ae.firebasestorage.app",
  messagingSenderId: "850443464289",
  appId: "1:850443464289:web:904ea0fbd6f20033c74420",
  measurementId: "G-RJFBDE53WX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

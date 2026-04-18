import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwd2oy4Nxxfn9d3Cax0OaRN0Ci8ifqCt0",
  authDomain: "trustpay-877bf.firebaseapp.com",
  projectId: "trustpay-877bf",
  storageBucket: "trustpay-877bf.firebasestorage.app",
  messagingSenderId: "623962033666",
  appId: "1:623962033666:web:6b305339a264922a73211b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
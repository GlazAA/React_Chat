import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "lumchatapp.firebaseapp.com",
  projectId: "lumchatapp",
  storageBucket: "lumchatapp.firebasestorage.app",
  messagingSenderId: "704936088035",
  appId: "1:704936088035:web:4cce363cb89d6b857150d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "chatapp");
export const storage = getStorage(app);


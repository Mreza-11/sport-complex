// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAF1ftSf7SQmHZUJI6nWb7RejP48-2t0Wc",
  authDomain: "sport-complex-1.firebaseapp.com",
  projectId: "sport-complex-1",
  storageBucket: "sport-complex-1.appspot.com",
  messagingSenderId: "895931530930",
  appId: "1:895931530930:web:c6528f117f77ace76213ab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCV9jNnsPzrqJ6fulJjsorrvn4U9GZApzE",
  authDomain: "onepiece-e9ad9.firebaseapp.com",
  projectId: "onepiece-e9ad9",
  storageBucket: "onepiece-e9ad9.appspot.com",
  messagingSenderId: "40105092967",
  appId: "1:40105092967:web:1d4f0066dc00579f80b1c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize storage correctly
const db = getFirestore(app);
export { db,auth,storage};
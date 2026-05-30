// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7XzC_ttJ7Doef4QcLQOBCP7lcWivVzW0",
  authDomain: "basic-management-project.firebaseapp.com",
  projectId: "basic-management-project",
  storageBucket: "basic-management-project.firebasestorage.app",
  messagingSenderId: "521563906591",
  appId: "1:521563906591:web:172d2a06563a929915ab2a",
  measurementId: "G-135VXSGYTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage }; // Export both Firestore and Storage instances
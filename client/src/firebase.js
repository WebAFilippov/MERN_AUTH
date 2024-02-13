// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_AUTH_API_KEY,
  authDomain: "mern-auth-1ac8b.firebaseapp.com",
  projectId: "mern-auth-1ac8b",
  storageBucket: "mern-auth-1ac8b.appspot.com",
  messagingSenderId: "522762491337",
  appId: "1:522762491337:web:29c23d8a4677df6a8b4418"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
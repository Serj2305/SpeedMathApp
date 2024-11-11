// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrPHWiAlx9PxOO0-7gRWKIlVPfNFwX2y4",
  authDomain: "speed-math-app.firebaseapp.com",
  projectId: "speed-math-app",
  storageBucket: "speed-math-app.firebasestorage.app",
  messagingSenderId: "822827597580",
  appId: "1:822827597580:web:45ac496fe85d6f1bf05329",
  measurementId: "G-2ZV2VGJQPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth()

export const register = (email: string, password: string) => 
    createUserWithEmailAndPassword(auth, email, password)


export const login = (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password)


export const logout = () => signOut(auth)

export const db = getFirestore(app)
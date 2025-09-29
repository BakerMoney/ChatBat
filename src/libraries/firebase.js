// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxE0wJi1O29vtA16vHMkN1ZeTDSTGI11Y",
  authDomain: "chatbat-52706.firebaseapp.com",
  projectId: "chatbat-52706",
  storageBucket: "chatbat-52706.firebasestorage.app",
  messagingSenderId: "294588559403",
  appId: "1:294588559403:web:6520d6de43d319d65dfa6e",
  measurementId: "G-B8MP2M9BGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1rlUmURTzu37gInK_VLWP2vAT3rPVpQo",
  authDomain: "twitterclone-f9e38.firebaseapp.com",
  projectId: "twitterclone-f9e38",
  storageBucket: "twitterclone-f9e38.appspot.com",
  messagingSenderId: "387088631978",
  appId: "1:387088631978:web:563ac3ec7c60a45e3468d3",
  measurementId: "G-2NXHSE8XQ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

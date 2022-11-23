import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHEAuMs3QAKj1J42AJQM7RaNtuTkYVoa4",
  authDomain: "auth-test-64a24.firebaseapp.com",
  projectId: "auth-test-64a24",
  storageBucket: "auth-test-64a24.appspot.com",
  messagingSenderId: "240076094091",
  appId: "1:240076094091:web:1cf83547e78612a696f28e",
  measurementId: "G-5ZVZC67MX4",
};

//init firebase app
const app = initializeApp(firebaseConfig);

//init services
const auth = getAuth();

const db = getFirestore(app);

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  signInAnonymously,
};

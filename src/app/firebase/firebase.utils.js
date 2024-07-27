import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNUqjxIdwdkUeKy2adk-xZyv-CSo12URw",
  authDomain: "chat-app-d28d3.firebaseapp.com",
  projectId: "chat-app-d28d3",
  storageBucket: "chat-app-d28d3.appspot.com",
  messagingSenderId: "1020559076672",
  appId: "1:1020559076672:web:5e7f0a90312efc9c4f5ea5",
  measurementId: "G-71CYPXGEKS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = getAuth();

export { auth, db };

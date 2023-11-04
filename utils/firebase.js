// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsVrJQAAiF3U-VcegQ9X7eHJ7mO7hMA5w",
  authDomain: "weatherapp-3c5aa.firebaseapp.com",
  projectId: "weatherapp-3c5aa",
  storageBucket: "weatherapp-3c5aa.appspot.com",
  messagingSenderId: "1014271192637",
  appId: "1:1014271192637:web:eb44400e0bb95bbd200454",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, ref, onValue };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2-WGmX20QZPCjmEHP9zj-d8zcjarUOOU",
  authDomain: "login-react-semestral.firebaseapp.com",
  projectId: "login-react-semestral",
  storageBucket: "login-react-semestral.firebasestorage.app",
  messagingSenderId: "194286186311",
  appId: "1:194286186311:web:de13e1a1043c549ef0e662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

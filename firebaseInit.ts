import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCJU5I4eUTnOU3FhsZt3A20wyFXNovW91Q",
  authDomain: "devlinks-56776.firebaseapp.com",
  projectId: "devlinks-56776",
  storageBucket: "devlinks-56776.appspot.com",
  messagingSenderId: "184555066771",
  appId: "1:184555066771:web:ec19357b6bd4cdfbf2c466",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLXdgbEzQ7QODfh-AymYTK_aYjBaycO6Y",
  authDomain: "moviedb-31246.firebaseapp.com",
  projectId: "moviedb-31246",
  storageBucket: "moviedb-31246.appspot.com",
  messagingSenderId: "79578320321",
  appId: "1:79578320321:web:3f3193622611ac31a1f340"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
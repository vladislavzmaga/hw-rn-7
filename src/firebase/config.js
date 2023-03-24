import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBh9U-1o16rciIDH81dZa_smqXoFICpTb4",
  authDomain: "react-native-socials-7ac73.firebaseapp.com",
  projectId: "react-native-socials-7ac73",
  storageBucket: "react-native-socials-7ac73.appspot.com",
  messagingSenderId: "870837503692",
  appId: "1:870837503692:web:f2c4e7dfe89ff5920e6469"
};
// A Firebase App is a container-like {object} that stores common 
// configuration and shares authentication across Firebase services.
const firebaseApp = initializeApp(firebaseConfig); // initializeApp({})
export const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// const storage = getStorage();
// const storageRef = ref(storage);


// const postCol = collection(db, 'posts');
// const snapshot = getDocs(postCol);

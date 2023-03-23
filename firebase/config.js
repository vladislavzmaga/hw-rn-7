import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChk7K7m_shPJNkB2WZEkF9UuacqxDdFQQ",
  authDomain: "react-native-social-b3e9d.firebaseapp.com",
  projectId: "react-native-social-b3e9d",
  storageBucket: "react-native-social-b3e9d.appspot.com",
  messagingSenderId: "981210618631",
  appId: "1:981210618631:web:1bd4f08e0d49968fb703a2",
  measurementId: "G-2PNSB2YB24",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

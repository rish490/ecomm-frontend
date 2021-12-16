import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBS2JATX965nq9xxV1kwyPsc29kvMyYeQU",
    authDomain: "ecommerce-3f38d.firebaseapp.com",
    databaseURL: "https://ecommerce-3f38d.firebaseio.com",
    projectId: "ecommerce-3f38d",
    storageBucket: "ecommerce-3f38d.appspot.com",
    messagingSenderId: "481359015761",
    appId: "1:481359015761:web:dc6f0bda49673d5c68ad70"
  };
  
  // Initialize Firebase
  const app = firebase.default.initializeApp(firebaseConfig); 
  export const auth=firebase.auth();
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();
  
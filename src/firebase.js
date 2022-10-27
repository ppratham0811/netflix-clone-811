import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTIPY6RQjsZcn_XAh7ct4rBxadtFiSyNc",
  authDomain: "netflix-chilling-811.firebaseapp.com",
  projectId: "netflix-chilling-811",
  storageBucket: "netflix-chilling-811.appspot.com",
  messagingSenderId: "908455956072",
  appId: "1:908455956072:web:8170eac36c09184fe9f5dd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default firestore;

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAK_uTQtVq4ZYPahxBDmA37ieugCUG4xYQ",
    authDomain: "slack-clone-by-kirti.firebaseapp.com",
    projectId: "slack-clone-by-kirti",
    storageBucket: "slack-clone-by-kirti.appspot.com",
    messagingSenderId: "253730088997",
    appId: "1:253730088997:web:8f7b19012626fe34a6f7cc"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();

  //storage reference for image uploads
  const storageRef = firebaseApp.storage().ref();
  const imagesRef = storageRef.child('images');

  //authentication providers
  const auth = firebase.auth();
  const providerGoogle = new firebase.auth.GoogleAuthProvider();

  export { storage, storageRef, imagesRef, auth, providerGoogle };
  export default db;
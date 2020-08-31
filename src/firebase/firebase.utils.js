import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDMmw3-YaLN7UpXGdACVeh0C-lAxyA4Zwk",
    authDomain: "foxy-db-87eba.firebaseapp.com",
    databaseURL: "https://foxy-db-87eba.firebaseio.com",
    projectId: "foxy-db-87eba",
    storageBucket: "foxy-db-87eba.appspot.com",
    messagingSenderId: "455554057044",
    appId: "1:455554057044:web:8f1b9cc9fbc428ea773ec1",
    measurementId: "G-VM6WY1Q816"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
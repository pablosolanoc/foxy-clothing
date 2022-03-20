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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(userRef);
  console.log(snapShot);
  
  if(! snapShot.exists ){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    }catch(e){
      console.log('Error creating User')
    }

  }
  
  return userRef;

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log("hola")
  // console.log(collectionRef);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  })

  return await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map(doc => { 
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator; 
  }, {})
}

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
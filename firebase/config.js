import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyBeWKnalMmHU_zIIvK4w_1LDSwdTn1q7Os',
  authDomain: 'react-native-first-e7954.firebaseapp.com',
  projectId: 'react-native-first-e7954',
  storageBucket: 'react-native-first-e7954.appspot.com',
  messagingSenderId: '222904997886',
  appId: '1:222904997886:web:d3dde275df30d67eff52af',
  measurementId: 'G-MREYLB7NKG',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };

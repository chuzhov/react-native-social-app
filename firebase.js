import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { firebaseConfig } from './firebase/config';
import { initializeApp } from 'firebase/app';

const firebase = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
export default firebase;

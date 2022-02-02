import firebaseConfig from '../../config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
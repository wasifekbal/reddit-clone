import { initializeApp, getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
/* prevents creation app instance both in server and client side at the same time. */
const app = !getApp.length ? initializeApp(firebaseConfig) : getApp();

/* for accessing firestore */
const firestore = getFirestore(app);

/* auth instance for managing authentication */
const auth = getAuth()

/* for accessing storage */
const storage = getStorage(app);

export {app, firestore, auth, storage};

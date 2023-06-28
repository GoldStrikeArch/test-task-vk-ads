import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBCA8JxvRzTZ1gU_Tb_bkTw9nIig2vRMw",
  authDomain: "test-task-vk-ads.firebaseapp.com",
  projectId: "test-task-vk-ads",
  storageBucket: "test-task-vk-ads.appspot.com",
  messagingSenderId: "133290285370",
  appId: "1:133290285370:web:c72e1a06f3ecb52fa19803",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const login = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

export const logout = () => signOut(auth);

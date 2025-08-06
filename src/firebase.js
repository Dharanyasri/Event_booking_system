
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2PJoo-5q8gm1V8BF_xK8nMfggjn8Gvzw",
  authDomain: "event-69fbe.firebaseapp.com",
  projectId: "event-69fbe",
  storageBucket: "event-69fbe.firebasestorage.app",
  messagingSenderId: "317802923431",
  appId: "1:317802923431:web:c5fd1caafc993b55692282",
  measurementId: "G-9L2EHFELB2"
};

const app = initializeApp(firebaseConfig);

// ✅ Export both
export const auth = getAuth(app);
export { app }; // ← add this line

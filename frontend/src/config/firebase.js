import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Load Firebase configuration keys dynamically from Vite env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if we have a valid configuration to initialize
const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);

let app = null;
let auth = null;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("🔥 Firebase Auth loaded successfully!");
  } catch (error) {
    console.error("🔥 Firebase initialization error: ", error);
  }
} else {
  console.log("ℹ️ Firebase is in local developer mode (Using console-logged mobile OTP fallback).");
}

export { auth, isConfigured };

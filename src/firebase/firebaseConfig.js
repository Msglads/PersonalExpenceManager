// src/firebase/firebaseConfig.js
//
// 1. Go to https://console.firebase.google.com/
// 2. Create a project (or use an existing one)
// 3. Click "Add app" -> Web app (</>) -> register it (no hosting needed)
// 4. Copy the config values Firebase gives you into the object below
// 5. In the Firebase console, go to Build > Firestore Database > Create database
//    (start in "test mode" for development so reads/writes are not blocked)

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCizcb-07yR2kFHe_z95yJqLCIjyMUNhhg",
  authDomain: "personal-expense-manager-af4ec.firebaseapp.com",
  projectId: "personal-expense-manager-af4ec",
  storageBucket: "personal-expense-manager-af4ec.firebasestorage.app",
  messagingSenderId: "525783125337",
  appId: "1:525783125337:web:78c42256281b8f49b91048",
};

// Note: measurementId / Firebase Analytics is intentionally omitted.
// The Analytics web SDK (firebase/analytics) relies on browser-only APIs
// and does not work in React Native / Expo. It's not needed for this app.

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

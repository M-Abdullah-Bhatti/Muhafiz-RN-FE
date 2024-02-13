// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7yjiB_JJWNOWxnbhj_eW5b6p077HFOJI",
  authDomain: "muhafiz-adddb.firebaseapp.com",
  projectId: "muhafiz-adddb",
  storageBucket: "muhafiz-adddb.appspot.com",
  messagingSenderId: "1031529694349",
  appId: "1:1031529694349:web:08b5986cfabf5389b9cec4",
  measurementId: "G-ZGSK45BZ8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize storage

export { app, analytics, storage }; // Export the initialized services

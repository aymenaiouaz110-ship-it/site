// Firebase Configuration for Lumière Skincare
// Replace the values below with your actual project credentials from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Global variables for Firebase services
let db = null;
let storage = null;
let auth = null;
let firebaseInitialized = false;

if (typeof firebase !== 'undefined') {
  // Check if API key is not a placeholder
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      storage = firebase.storage();
      auth = firebase.auth();
      firebaseInitialized = true;
      console.log("Firebase initialized successfully.");
    } catch (error) {
      console.error("Error during Firebase initialization:", error);
    }
  } else {
    console.warn("Firebase configuration keys are still placeholders. Please update them in firebase-config.js.");
  }
} else {
  console.warn("Firebase SDK is not loaded. Dynamic features will fall back to static productsList.");
}

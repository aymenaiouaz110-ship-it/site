// =========================================================================
// 🔑 FIREBASE CONFIGURATION - LUMIÈRE SKINCARE
// =========================================================================
// ⚠️ هام جداً: استبدل القيم الافتراضية أدناه بمعلومات مشروعك الحقيقي من Firebase Console.
// يمكنك الحصول عليها من: Firebase Console -> Project Settings -> General -> Web Apps.
// =========================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCWZO6Jw930-96v4hX2g4e3kpiRWnmX-cg",
  authDomain: "lumiere-33b7e.firebaseapp.com",
  projectId: "lumiere-33b7e",
  storageBucket: "lumiere-33b7e.firebasestorage.app",
  messagingSenderId: "34937451480",
  appId: "1:34937451480:web:3eb632cd032bb71ccfb8ad"
};

// متغيرات عامة للخدمات
let db = null;
let storage = null;
let auth = null;
let firebaseInitialized = false;

// تهيئة Firebase تلقائياً عند تغيير المفاتيح
if (typeof firebase !== 'undefined') {
  // التحقق من أن المفاتيح تم استبدالها وليست القيم الافتراضية
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      storage = firebase.storage();
      auth = firebase.auth();
      firebaseInitialized = true;
      console.log("Firebase initialized successfully. Dynamic Firestore database is connected!");
    } catch (error) {
      console.error("Error during Firebase initialization:", error);
    }
  } else {
    console.warn("⚠️ Firebase Warning: You are using default placeholder keys. Please update your credentials in firebase-config.js to enable Firestore database features.");
  }
} else {
  console.error("⚠️ Firebase SDK not loaded. Please verify scripts CDN import order.");
}

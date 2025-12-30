import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVOikui7peGvas_F_kKzyVt0lJM48lVic",
  authDomain: "gym-tracker-8f89a.firebaseapp.com",
  projectId: "gym-tracker-8f89a",
  storageBucket: "gym-tracker-8f89a.firebasestorage.app",
  messagingSenderId: "255163053192",
  appId: "1:255163053192:web:59101c0548f0e80aaa9b3d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

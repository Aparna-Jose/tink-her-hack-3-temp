// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2--90UAT1wR_qCpyiPjyMvLDfFR1dVeU",
  authDomain: "legacyy-76522.firebaseapp.com",
  projectId: "legacyy-76522",
  storageBucket: "legacyy-76522.appspot.com",
  messagingSenderId: "1007588615772",
  appId: "1:1007588615772:web:eaeb2d69d58fc5882f6899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle user registration
document.getElementById('submit').addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Initialize Firestore document for the user
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      photoUrls: [] // Initialize an empty list for photo URLs
    });

    alert("Account created successfully!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// Handle user login
document.getElementById('login').addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Welcome back, ${userCredential.user.email}!`);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
});

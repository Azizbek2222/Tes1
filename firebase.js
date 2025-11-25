// firebase.js

// Firebase SDK modullari
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue, runTransaction } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Sen yuborgan Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDm5joBc7dicQrPvrmtH_v-RMhkQrIPcxY",
  authDomain: "nexalum-1.firebaseapp.com",
  projectId: "nexalum-1",
  storageBucket: "nexalum-1.firebasestorage.app",
  messagingSenderId: "418037039727",
  appId: "1:418037039727:web:8f0d8ed7c00cdf613f039a",
  measurementId: "G-F848CDBJ7W"
};

// Firebase'ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Qurilma ID yaratamiz (agar bo‘lmasa)
let device = localStorage.getItem("device_id");
if (!device) {
    device = "dev_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("device_id", device);
}

// Balansni o‘qish
export function onBalanceChange(callback) {
    onValue(ref(db, "users/" + device + "/balance"), snap => {
        callback(snap.val() || 0);
    });
}

// Balansga + qiymat qo‘shish
export function addBalance(amount) {
    return runTransaction(ref(db, "users/" + device + "/balance"), bal => {
        return (bal || 0) + amount;
    });
}

// Balans 0 bo‘lsa boshlang‘ich qiymat beramiz
set(ref(db, "users/" + device + "/balance"), 0.0);

console.log("Firebase loaded, device:", device);

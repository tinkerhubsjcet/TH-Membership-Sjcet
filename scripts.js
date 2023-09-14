// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEB8bO4hRJ1eZ2fQp-CkN9Bv9QJx6HYJI",
  authDomain: "membership-30cdf.firebaseapp.com",
  projectId: "membership-30cdf",
  storageBucket: "membership-30cdf.appspot.com",
  messagingSenderId: "564355280310",
  appId: "1:564355280310:web:5043e0398add9c0b27e517",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var id = Math.random().toString(16).slice(8).toUpperCase();

document.getElementById("id").value = id;

document.getElementById("submit-btn").onclick = async function (e) {
  e.preventDefault();
  //   validation
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("phone").value == "" ||
    document.getElementById("phone").value.length != 10
  ) {
    // alert("Please fill all the fields");
    document.getElementById("error").innerHTML =
      "Please fill all the fields in correct format";
    return;
  }

  const docRef = await addDoc(collection(db, "data"), {
    Id: document.getElementById("id").value,
    Name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    Phone: document.getElementById("phone").value,
  });
  console.log("Document written with ID: ", docRef.id);
  document.getElementById("submit-btn").innerHTML = "Data added successfully";
  //   location.reload();
};
window.onload = async function () {
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    const row = document.getElementById("tbody").insertRow(0);
    row.insertCell(0).innerHTML = doc.data().Name;
    row.insertCell(-1).innerHTML = doc.data().Message;
  });
};

window.onload = () => {
  // Delay the scrolling action by 5 seconds (5000 milliseconds)
  setTimeout(() => {
    // Scroll the page by 100vh
    window.scrollTo(0, window.innerHeight);
  }, 2000);
};

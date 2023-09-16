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
const currentDate = new Date();

document.addEventListener("DOMContentLoaded", () => {
  const cardDesign = document.getElementById("cardDesign");
  const downloadButton = document.getElementById("downloadButton");

  downloadButton.addEventListener("click", () => {
    // Set the capture dimensions and DPI settings
    html2canvas(cardDesign, {
      dpi: 300, // Adjust the DPI as needed
    }).then((canvas) => {
      const imageDataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imageDataUrl;
      a.download = "cardDesign.png";
      a.click();
    });
  });
});

var id = Math.random().toString(16).slice(8).toUpperCase();
document.getElementById("id").value = id;

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("get-idcard").onclick = () => {
    document.getElementById("popUP").style.display = "flex";
  };
  document.getElementById("close").onclick = () => {
    document.getElementById("popUP").style.display = "none";
  };
  document.getElementById("idSubmit").onclick = async () => {
    console.log("hi");
    const querySnapshot = await getDocs(collection(db, "data"));
    const membershipId = document.getElementById("membershipId").value;

    // Convert querySnapshot to an array
    const dataArray = querySnapshot.docs.map((doc) => doc.data());

    // Use filter on the array
    const filteredData = dataArray.filter((data) => {
      // console.log(data);
      return data.Id == membershipId;
    });
    console.log(filteredData);
    if (filteredData.length > 0) {
      const data = filteredData[0];
      const timestamp = data.Date;

      const date = timestamp.toDate();

      // Format the date as "20 September 2023"
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString(undefined, options);
      const dayAndMonth = formattedDate.split(" ")[0] + "th " + formattedDate.split(" ")[1];
      const year = formattedDate.split(" ")[2];

      document.getElementById("memberName").innerHTML = data.Name;
      document.getElementById("memberId").innerHTML = data.Id;
      document.getElementById("joinDate").innerHTML = dayAndMonth;
      document.getElementById("joinDateYear").innerHTML = year;
    }
  };
});

document.getElementById("submit-btn").onclick = async function (e) {
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("phone").value == "" ||
    document.getElementById("phone").value.length != 10
  ) {
    document.getElementById("error").innerHTML =
      "Please fill all the fields in correct format";
    return;
  }
  document.getElementById("submit-btn").disabled = true;
  const docRef = await addDoc(collection(db, "data"), {
    Id: document.getElementById("id").value,
    Name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    Phone: document.getElementById("phone").value,
    Date: currentDate, // Include the current date
  });
  // console.log("Document written with ID: ", docRef.id);
  setTimeout(() => {
    document.getElementById("submit-btn").innerHTML = "Data added successfully";
    document.getElementById("submit-btn").style.background = "green";
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("submit-btn").innerHTML = "Submit";
    var id = Math.random().toString(16).slice(8).toUpperCase();
    document.getElementById("id").value = id;
  }, 2000);
};

window.onload = async () => {
  if (!window.location.href.includes("#")) {
    setTimeout(() => {
      window.scrollTo(0, window.innerHeight);
    }, 2000);
  }
};

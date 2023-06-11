const firebaseConfig = {
    apiKey: "AIzaSyC3bIuP-9JQTkz7YYwLfoEuuo3ulihGy-k",
    authDomain: "tiantian-iyer.firebaseapp.com",
    databaseURL: "https://tiantian-iyer-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tiantian-iyer",
    storageBucket: "tiantian-iyer.appspot.com",
    messagingSenderId: "655841361889",
    appId: "1:655841361889:web:25c3626ea9f6ed7c961ca0",
    measurementId: "G-RE7R346VYB"
};   
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

document.getElementById("create-user").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById("input-userID").value;
  var password = document.getElementById("input-pass").value;

  // Call a function to store the username and password in the database
  storeUserData(username, password);
});

function storeUserData(username, password) {
    var usersRef = app.database().ref("users");
    var numbersArray = Array.from({ length: 1331 }, (_, index) => index);
    usersRef.orderByChild("username").equalTo(username).once("value", function(snapshot) {
      if (snapshot.exists()) {
        console.log("Username already exists.");
      } else {
        var userData = {
          username: username,
          password: password,
          learnt: [],
          incorrect: [],
          unseen: numbersArray
        }; 
        usersRef.push(userData)
          .then(function() {
            console.log("User data stored successfully.");
            window.location.replace('/TianTian/login/')
          })
          .catch(function(error) {
            console.error("Error storing user data: ", error);
          });
      }
    });
  }
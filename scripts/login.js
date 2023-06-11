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
const app = firebase.initializeApp(firebaseConfig);

document.getElementById("create-user").addEventListener("click", function(event) {
  event.preventDefault();

  var username = document.getElementById("input-userID").value;
  var password = document.getElementById("input-pass").value;

  verifyLogin(username, password);
});

function verifyLogin(username, password) {
    var usersRef = app.database().ref("users");
    usersRef.orderByChild("username").equalTo(username).once("value", function(snapshot) {
      if (snapshot.exists()) {
        var userKey = Object.keys(snapshot.val())[0];
        snapshot.forEach(function(childSnapshot) {
          var userData = childSnapshot.val();
          if (userData.password === password) {
            localStorage.setItem("tiantian-userkey", userKey);
            window.location.replace('/TianTian/')
          } else {
            console.log("Invalid password!");
          }
        });
      } else {
        console.log("Invalid username!");
      }
    });
  }
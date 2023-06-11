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

function checkUserData(){
    var userKey = localStorage.getItem("tiantian-userkey");
    app.database().ref("users/" + userKey).once("value")
    .then(function(snapshot) {
      if (snapshot.exists()) {
        userData = snapshot.val();
      } else {
        console.log("User data not found for the given key.");
      }
    })
    .catch(function(error) {
      console.error("Error retrieving user data: ", error);
    });
  }

  function getUserData() {
    var userKey = localStorage.getItem("tiantian-userkey");
    if(!userKey){
        console.log("User key not found in localStorage");
        window.location.replace('/TianTian/login/')
    }
    return new Promise(function(resolve, reject) {
      app.database().ref("users/" + userKey).once("value")
        .then(function(snapshot) {
          var userData = snapshot.val();
          resolve(userData);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
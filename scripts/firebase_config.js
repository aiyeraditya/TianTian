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

function getDataRef(){
    var userKey = localStorage.getItem("tiantian-userkey");
    const dataRef = app.database().ref("users/" + userKey);
    return dataRef;
}

function getPropertyVal(dataRef, property_val){
  return new Promise(function(resolve, reject) {
    dataRef.once('value')
    .then(function(snapshot) {
        userData = snapshot.val();
        resolve(userData[property_val])
    })
    .catch((error)=> {
        console.error('Error retrieving data:', error);
        reject(error);
      });
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
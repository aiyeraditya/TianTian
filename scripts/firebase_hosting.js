<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC3bIuP-9JQTkz7YYwLfoEuuo3ulihGy-k",
    authDomain: "tiantian-iyer.firebaseapp.com",
    projectId: "tiantian-iyer",
    storageBucket: "tiantian-iyer.appspot.com",
    messagingSenderId: "655841361889",
    appId: "1:655841361889:web:25c3626ea9f6ed7c961ca0",
    measurementId: "G-RE7R346VYB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

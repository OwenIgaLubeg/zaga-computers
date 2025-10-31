
<script type="module">
  // Import Firebase SDKs directly from the CDN (no npm required)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";


  const firebaseConfig = {
    apiKey: "AIzaSyDTKJ5WuSPBbIwVXKjsL2h_4K360qIJzb8",
    authDomain: "zaga-tech-store.firebaseapp.com",
    projectId: "zaga-tech-store",
    storageBucket: "zaga-tech-store.firebasestorage.app",
    messagingSenderId: "402026502827",
    appId: "1:402026502827:web:664170cc19966073f435ee",
    measurementId: "G-NN99SC43XX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Export Firebase services for other scripts
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);
</script>

importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
 apiKey: "AIzaSyDypfERureopDOX-xIm7n_ZfJZCOfFtv94",
 authDomain: "buildup-7a0db.firebaseapp.com",
 projectId: "buildup-7a0db",
 storageBucket: "buildup-7a0db.appspot.com",
 messagingSenderId: "529304574140",
 appId: "1:529304574140:web:34c1e5a61b627347e2d8b9"
});
const messaging = firebase.messaging();
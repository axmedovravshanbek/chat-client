importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAcZjq79MK7RBtrphuP8uZ6mbix14znRXE",
    authDomain: "react-chat-99158.firebaseapp.com",
    projectId: "react-chat-99158",
    storageBucket: "react-chat-99158.appspot.com",
    messagingSenderId: "1068646634679",
    appId: "1:1068646634679:web:ddef2280b5f14f2c996932",
    measurementId: "G-0N8MVK4F65"
});
/*const messaging =*/
firebase.messaging();

// console.log(messaging);
//
// messaging.onBackgroundMessage(function (payload) {
//     console.log('Received background message ', payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };
//
//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

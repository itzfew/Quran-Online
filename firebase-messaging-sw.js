importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js');

// Initialize Firebase in the service worker
const firebaseConfig = {
    apiKey: "AIzaSyAWblATQVo78bKiO5uEhOB5xDGhFu3oBqE",
    authDomain: "quran-online-a43be.firebaseapp.com",
    projectId: "quran-online-a43be",
    storageBucket: "quran-online-a43be.firebasestorage.app",
    messagingSenderId: "382216468952",
    appId: "1:382216468952:web:235ea2c2d81ebe81ec1aad",
    measurementId: "G-ZW77HK1NH4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

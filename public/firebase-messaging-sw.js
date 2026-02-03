importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBTe_SvWlMC9aXgk7oVh1XtCVu_7YZb9Qw",
  authDomain: "rdthaco-push.firebaseapp.com",
  projectId: "rdthaco-push",
  storageBucket: "rdthaco-push.firebasestorage.app",
  messagingSenderId: "765440825497",
  appId: "1:765440825497:web:4f30bd7dfdae9a1c89c008",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw] BG message:", payload);

  const title = payload?.notification?.title || "Thông báo";
  const options = {
    body: payload?.notification?.body || "",
    icon: "/logo.png",
  };

  self.registration.showNotification(title, options);
});

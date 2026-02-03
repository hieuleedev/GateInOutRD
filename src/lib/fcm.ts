import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";

export async function getFCMToken(): Promise<string | null> {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string;
  if (!vapidKey) {
    console.error("❌ Missing VITE_FIREBASE_VAPID_KEY in .env");
    return null;
  }

  const messaging = await getFirebaseMessaging();
  if (!messaging) {
    console.error("❌ This browser does not support Firebase Messaging");
    return null;
  }

  try {
    // 🔥 quan trọng: gắn service worker vào getToken
    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    return token || null;
  } catch (err) {
    console.error("FCM getToken error:", err);
    return null;
  }
}

export async function onForegroundMessage(cb: (payload: any) => void) {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return;
  return onMessage(messaging, cb);
}

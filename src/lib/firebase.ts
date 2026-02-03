import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { firebaseConfig } from "../config/firebase.config";

const app = initializeApp(firebaseConfig);

export async function getFirebaseMessaging() {
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
}

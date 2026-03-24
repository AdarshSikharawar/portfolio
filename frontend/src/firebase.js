import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "XXXX",
    authDomain: "XXXX",
    projectId: "XXXX",
    appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
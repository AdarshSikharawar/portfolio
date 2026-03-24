import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIG1ePxn9Cgc6DEGRaOxcE43TjmHZUIWE",
    authDomain: "porfolio-adrsh.firebaseapp.com",
    projectId: "porfolio-adrsh",
    appId: "1:265288592643:web:cf4b60bcc427c796408d36"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
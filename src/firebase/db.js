import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  initializeFirestore 
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Fix "Hanging" connection by forcing Long Polling
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Data Persistence Collection
const DATA_DOC_ID = "main_data";

export const syncDataToCloud = async (data) => {
  // Add a timeout to prevent hanging forever if Google doesn't respond
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Google Cloud did not respond in time.")), 15000)
  );

  try {
    const docRef = doc(db, "temple_data", DATA_DOC_ID);
    const syncPromise = setDoc(docRef, { 
      ...data, 
      lastUpdated: new Date().toISOString() 
    }, { merge: true });

    await Promise.race([syncPromise, timeoutPromise]);
    console.log("Cloud Database Updated!");
    return true;
  } catch (error) {
    console.error("Cloud Sync Error:", error);
    throw error;
  }
};

export const subscribeToCloudData = (callback) => {
  const docRef = doc(db, "temple_data", DATA_DOC_ID);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
};

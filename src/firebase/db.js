import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Data Persistence Collection
const DATA_DOC_ID = "main_data";

export const syncDataToCloud = async (data) => {
  try {
    const docRef = doc(db, "temple_data", DATA_DOC_ID);
    await setDoc(docRef, { ...data, lastUpdated: new Date().toISOString() }, { merge: true });
    console.log("Cloud Database Updated!");
  } catch (error) {
    console.error("Cloud Sync Error:", error);
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

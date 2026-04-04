"use server";
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { app } from "../../config/firebase";

export default async function saveReport(markdown: string): Promise<void> {
  try {
    const db = getFirestore(app);
    const reportRef = doc(db, "report", "latest");

    await setDoc(reportRef, {
      content: markdown,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving report to database:", error);
    throw error;
  }
}

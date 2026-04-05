"use server";
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { app } from "../../config/firebase";

export default async function saveSummary(
  markdown: string,
  summaryType: string,
): Promise<void> {
  try {
    const db = getFirestore(app);
    const reportRef = doc(db, "summary", summaryType);

    await setDoc(reportRef, {
      content: markdown,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving summary to database:", error);
    throw error;
  }
}

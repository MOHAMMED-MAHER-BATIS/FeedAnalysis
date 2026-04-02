"use server";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "../../config/firebase";

type AnalysisResult = {
  sentiment: "positive" | "negative" | "neutral";
  summary: string;
  key_strengths: string[];
  key_problems: string[];
};

type StatisticsDocument = {
  total_feedbacks: number;
  sentiment_counts: {
    positive: number;
    negative: number;
    neutral: number;
  };
  strengths: string[];
  problems: string[];
  strengths_frequencies?: Record<string, number>;
  problems_frequencies?: Record<string, number>;
  lastUpdatedAt: unknown;
};

function appendItems(base: string[], items: string[]): string[] {
  const cleaned = items.map((item) => item.trim()).filter(Boolean);
  return [...base, ...cleaned];
}

function frequencyMapToList(frequencyMap?: Record<string, number>): string[] {
  if (!frequencyMap) return [];
  return Object.keys(frequencyMap);
}

async function updateStatisticsCounter(result: AnalysisResult) {
  const db = getFirestore(app);
  const statsId = "global";
  const statsRef = doc(db, "statistics", statsId);

  const existingSnap = await getDoc(statsRef);
  const existing = existingSnap.exists()
    ? (existingSnap.data() as Partial<StatisticsDocument>)
    : {};

  const currentSentimentCounts = {
    positive: existing.sentiment_counts?.positive ?? 0,
    negative: existing.sentiment_counts?.negative ?? 0,
    neutral: existing.sentiment_counts?.neutral ?? 0,
  };

  currentSentimentCounts[result.sentiment] += 1;

  await setDoc(statsRef, {
    total_feedbacks: (existing.total_feedbacks ?? 0) + 1,
    sentiment_counts: currentSentimentCounts,
    strengths: appendItems(
      existing.strengths ?? frequencyMapToList(existing.strengths_frequencies),
      result.key_strengths,
    ),
    problems: appendItems(
      existing.problems ?? frequencyMapToList(existing.problems_frequencies),
      result.key_problems,
    ),
    lastUpdatedAt: serverTimestamp(),
  });
}

export default async function saveFeedbackResult(
  original_text: string,
  result: AnalysisResult,
) {
  const db = getFirestore(app);

  const docRef = await addDoc(collection(db, "feedbacks"), {
    original_text,
    sentiment: result.sentiment,
    summary: result.summary,
    key_strengths: result.key_strengths,
    key_problems: result.key_problems,
    createdAt: serverTimestamp(),
  });

  await updateStatisticsCounter(result);

  return docRef.id;
}

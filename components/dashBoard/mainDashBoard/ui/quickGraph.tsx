"use client";
import "./quickGraph.css";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebase";

type StatisticsDocument = {
  total_feedbacks: number;
  sentiment_counts: {
    positive: number;
    negative: number;
    neutral: number;
  };
  strengths?: string[];
  problems?: string[];
  strengths_frequencies?: Record<string, number>;
  problems_frequencies?: Record<string, number>;
};

function mapToList(values?: Record<string, number>): string[] {
  return values ? Object.keys(values) : [];
}

export default function QuickGraph() {
  const [stats, setStats] = useState<StatisticsDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const db = getFirestore(app);
        const statsRef = doc(db, "statistics", "global");
        const docSnap = await getDoc(statsRef);

        if (docSnap.exists()) {
          setStats(docSnap.data() as StatisticsDocument);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!stats) return <div>No data available</div>;

  const {
    total_feedbacks = 0,
    sentiment_counts,
    strengths = [],
    problems = [],
    strengths_frequencies,
    problems_frequencies,
  } = stats;
  const { positive = 0, neutral = 0, negative = 0 } = sentiment_counts || {};

  const overallScore =
    total_feedbacks > 0 ? Math.round((positive / total_feedbacks) * 100) : 0;

  const strengthsList =
    strengths.length > 0 ? strengths : mapToList(strengths_frequencies);
  const problemsList =
    problems.length > 0 ? problems : mapToList(problems_frequencies);

  return (
    <div className="quickGraphContainer">
      <div className="overallScore">Overall Score: {overallScore}%</div>
      <div className="totalFeedback">Total Feedback: {total_feedbacks}</div>

      <div className="sentimentContainer">
        <div className="goodSentiment">Good: {positive}</div>
        <div className="neutralSentiment">Neutral: {neutral}</div>
        <div className="badSentiment">Bad: {negative}</div>
      </div>

      <div className="frequenciesContaner">
        <div className="strength">
          {/* Strengths:{" "}
          {strengthsList.length > 0 ? strengthsList.join(", ") : "N/A"} */}
          strength
        </div>
        <div className="problem">
          {/* Problems: {problemsList.length > 0 ? problemsList.join(", ") : "N/A"} */}
          problem
        </div>
      </div>
    </div>
  );
}

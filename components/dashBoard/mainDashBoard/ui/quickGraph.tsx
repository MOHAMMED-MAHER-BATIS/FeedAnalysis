"use client";
import "./quickGraph.css";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebase";
import { generateReport } from "@/hooks/ai/generateReport";
import { generateSummary } from "@/hooks/ai/generateSummary";
import Modal from "react-modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [report, setReport] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

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

  async function handleGenerateReport(
    payload: StatisticsDocument | string[],
    reportType: "report" | "good-summary" | "bad-summary",
  ) {
    if (reportType === "report") {
      await generateReport(JSON.stringify(payload));
      return;
    }
    if (reportType === "good-summary" || reportType === "bad-summary") {
      await generateSummary(JSON.stringify(payload), reportType);
    }
  }

  async function handleViewReport() {
    try {
      const db = getFirestore(app);
      const reportRef = doc(db, "report", "latest");
      const reportSnap = await getDoc(reportRef);

      if (reportSnap.exists()) {
        const reportContent = reportSnap.data().content;
        setReport(reportContent);
        setIsOpen(true);
      } else {
        console.log("No report found. Generate one first.");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  }
  async function handleViewSummary(
    summaryType: "good-summary" | "bad-summary",
  ) {
    try {
      const db = getFirestore(app);
      const reportRef = doc(db, "summary", summaryType);
      const reportSnap = await getDoc(reportRef);

      if (reportSnap.exists()) {
        const reportContent = reportSnap.data().content;
        setReport(reportContent);
        setIsOpen(true);
      } else {
        console.log("No report found. Generate one first.");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  }
  return (
    <div className="quickGraphContainer">
      <div className="overallContainer">
        <div className="overallScore">Overall Score: {overallScore}%</div>
        <div className="totalFeedback">Total Feedback: {total_feedbacks}</div>
        <div className="reportButtonsContainer">
          <button
            className="reportButton"
            onClick={() => handleGenerateReport(stats, "report")}
          >
            GENERATE REPORT ✨
          </button>
          <button className="reportButton" onClick={handleViewReport}>
            VIEW REPORT 📄
          </button>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Generated report"
            className="reportModal"
            overlayClassName="reportModalOverlay"
            closeTimeoutMS={150}
          >
            <div className="reportModalHeader">
              <h3>Generated Report</h3>
              <button
                type="button"
                className="reportModalCloseButton"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="reportModalContent">
              {report ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {report}
                </ReactMarkdown>
              ) : (
                <p>No report content found.</p>
              )}
            </div>
          </Modal>
        </div>
      </div>

      <div className="sentimentContainer">
        <div className="goodSentiment">Positive: {positive}</div>
        <div className="neutralSentiment">Neutral: {neutral}</div>
        <div className="badSentiment">Negative: {negative}</div>
      </div>

      <div className="frequenciesContaner">
        <div className="strength">
          <div>
            <button
              className="reportButtonStrengths"
              onClick={() =>
                handleGenerateReport(strengthsList, "good-summary")
              }
            >
              Summarize the Strengths ✨
            </button>
            <button
              className="reportButtonStrengths"
              onClick={() => handleViewSummary("good-summary")}
            >
              VIEW The Summary 📄
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Generated report"
            className="reportModal"
            overlayClassName="reportModalOverlay"
            closeTimeoutMS={150}
          >
            <div className="reportModalHeader">
              <h3>Generated Report</h3>
              <button
                type="button"
                className="reportModalCloseButton"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="reportModalContent">
              {report ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {report}
                </ReactMarkdown>
              ) : (
                <p>No report content found.</p>
              )}
            </div>
          </Modal>
          <div className="listTitle">Strengths:</div>
          {strengthsList.length > 0 ? (
            <ul className="feedbackList">
              {strengthsList.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : (
            <div>N/A</div>
          )}
        </div>
        <div className="problem">
          <div>
            <button
              className="reportButtonProblems"
              onClick={() => handleGenerateReport(problemsList, "bad-summary")}
            >
              Summarize the Problems ✨
            </button>
            <button
              className="reportButtonProblems"
              onClick={() => handleViewSummary("bad-summary")}
            >
              VIEW The Summary 📄
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Generated report"
            className="reportModal"
            overlayClassName="reportModalOverlay"
            closeTimeoutMS={150}
          >
            <div className="reportModalHeader">
              <h3>Generated Report</h3>
              <button
                type="button"
                className="reportModalCloseButton"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="reportModalContent">
              {report ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {report}
                </ReactMarkdown>
              ) : (
                <p>No report content found.</p>
              )}
            </div>
          </Modal>
          <div className="listTitle">Problems:</div>
          {problemsList.length > 0 ? (
            <ul className="feedbackList">
              {problemsList.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : (
            <div>N/A</div>
          )}
        </div>
      </div>
    </div>
  );
}
function reload() {
  throw new Error("Function not implemented.");
}

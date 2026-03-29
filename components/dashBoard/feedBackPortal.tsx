"use client";
import "./feedBackPortal.css";
import { useState } from "react";
import { analysFeedback } from "../../hooks/ai/giminiAPI";
export default function FeedBackPortal() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    console.log(await analysFeedback(feedback));
  };
  return (
    <main>
      <form className="feedback-form" action="" onSubmit={handleSubmit}>
        <label htmlFor="feedback">Please Provide Your Feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

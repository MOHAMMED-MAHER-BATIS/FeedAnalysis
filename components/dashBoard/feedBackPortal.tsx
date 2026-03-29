"use client";
import { useState } from "react";
import "./feedBackPortal.css";
export default function FeedBackPortal() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    
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

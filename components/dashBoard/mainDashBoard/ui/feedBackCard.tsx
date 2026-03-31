import React from "react";
import "./feedBackCard.css";
export default function FeedbackCard() {
  return (
    <div className="feedbackCard">
      <div className="liftside">
        <div>
          <div className="sentimentbadge">good</div>
        </div>
        <div className="bottomside">
          <div className="original_text">Original Text</div>
          <div className="summary"> Summary</div>
        </div>
      </div>
      <div className="keyContaner">
        <div className="key_strengths">Key Strengths</div>
        <div className="key_problems">Key Problems</div>
      </div>
    </div>
  );
}

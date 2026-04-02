import "./dashBoard.css";
import FeedbackCard from "./ui/feedBackCard";
import QuickGraph from "./ui/quickGraph";
export default function Dashboard() {
  return (
    <main>
      {/* sidebare */}
      {/* <div className="sidebar">
        <h1>here is the sidebare</h1>
      </div> */}
      {/* main content */}
      <div className="mainContent">
        {/* top content */}
        <div className="topContent">
          <QuickGraph />
        </div>
        {/* bottom content */}
        <div className="bottomContent">
          <FeedbackCard />
        </div>
      </div>
    </main>
  );
}

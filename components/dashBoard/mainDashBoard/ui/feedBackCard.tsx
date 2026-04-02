"use client";
import "./feedBackCard.css";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase";
interface Post {
  id: string;
  sentiment?: string;
  original_text?: string;
  summary?: string;
  key_strengths?: string | string[];
  key_problems?: string | string[];
}

function formatList(value?: string | string[]) {
  if (!value) return "N/A";
  return Array.isArray(value) ? value.join(" ◾ ") : value;
}

function sentimentClass(sentiment?: string) {
  const safe = (sentiment ?? "").toLowerCase();
  if (safe === "positive") return "sentiment-positive";
  if (safe === "negative") return "sentiment-negative";
  if (safe === "neutral") return "sentiment-neutral";
  return "sentiment-neutral";
}

export default function FeedbackCard() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsCollectionRef = collection(db, "feedbacks");
        const querySnapshot = await getDocs(postsCollectionRef);

        const postsList: Post[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Post, "id">;
          return {
            id: doc.id,
            ...data,
          };
        });

        setPosts(postsList);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="feedbackCardList">
      {posts.map((post) => (
        <div className="feedbackCard" key={post.id}>
          <div className="sentimentColumn">
            <div className={`sentimentbadge ${sentimentClass(post.sentiment)}`}>
              {post.sentiment?.toUpperCase() ?? "N/A"}
            </div>
          </div>

          <div className="detailColumn">
            <div className="sectionTitle">OREGINAL_FEEDBACK 📄</div>
            <div className="sectionBody">
              ◾{post.original_text ?? "No text"}
            </div>
          </div>

          <div className="summaryColumn">
            <div className="sectionTitleWithIcon">
              <span className="sectionTitle">AI_SUMMARY ✨</span>
            </div>
            <div className="sectionBody">◾{post.summary ?? "No summary"}</div>
          </div>

          <div className="keyPointsColumn">
            {post.key_strengths?.length === 0 ? null : (
              <div className="keyGroup">
                <div className="sectionTitleWithIcon">
                  <span className="sectionTitle">KEY_STRENGTHS 📈</span>
                </div>
                <div className="sectionBody">
                  {formatList(post.key_strengths)}
                </div>
              </div>
            )}
            {post.key_problems?.length === 0 ? null : (
              <div className="keyGroup">
                <div className="sectionTitleWithIcon">
                  <span className="sectionTitle">KEY_PROBLEMS 📉</span>
                </div>
                <div className="sectionBody">
                  {formatList(post.key_problems)}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

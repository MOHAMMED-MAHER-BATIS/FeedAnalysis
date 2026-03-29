"use client";
import React from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../../config/firebase";
import "./navBar.css";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    const auth = getAuth(app);
    auth.signOut().then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <nav className="navBar" aria-label="Main navigation">
      <div>
        <h1 className="brand">FeedAnalysis</h1>
      </div>
      {isLoggedIn ? (
        <div className="navLinks">
          <Link className="feedBackPortal" href="/feedBackPortal">
            Feedback Portal
          </Link>
        </div>
      ) : null}
      ;
      {isLoggedIn ? (
        <div>
          <Link className="logout" href="/" onClick={logout}>
            Logout
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

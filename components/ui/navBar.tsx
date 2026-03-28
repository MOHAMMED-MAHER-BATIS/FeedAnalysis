"use client";
import React from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../config/firebase";
import "./navBar.css";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  return (
    <nav className="navBar" aria-label="Main navigation">
      <h1 className="brand">FeedAnalysis</h1>
    </nav>
  );
}

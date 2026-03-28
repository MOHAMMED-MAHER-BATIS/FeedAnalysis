"use client";

import "./signIn.css";
import React from "react";
import { useRouter } from "next/navigation";
import loginUserHandler from "../../hooks/auth/loginUserHandler";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = async () => {
    console.log("Logging in user with email:", email, password);
    try {
      await loginUserHandler(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in user:", error);
      alert(error);
    }
  };

  return (
    <div className="FormContainer">
      <h1>Welcome to the FeedAnalysis App</h1>
      <h1>Log In Please</h1>
      <form
        className="signInForm"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.toString())}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.toString())}
        />
        <button type="submit">Log In</button>
        <a href="/">Don't have an account? Sign up</a>
      </form>
    </div>
  );
}

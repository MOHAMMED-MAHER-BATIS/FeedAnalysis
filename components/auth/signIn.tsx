"use client";

import "./signIn.css";
import React from "react";
import { useRouter } from "next/navigation";
import createUserHandler from "../../hooks/auth/createUserHandler";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const createUser = async () => {
    console.log("Creating user with email:", email, password);
    try {
      await createUserHandler(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="FormContainer">
      <h1>Welcome to the FeedAnalysis App</h1>
      <h1>Sign In Please</h1>
      <form
        className="signInForm"
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

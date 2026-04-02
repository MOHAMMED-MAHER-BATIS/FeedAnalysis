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
      alert(error);
    }
  };

  return (
    <div className="FormContainer">
      <h1>Welcome to the FeedAnalysis App</h1>
      <form
        className="signInForm"
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        <h3>Sign In</h3>
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
        <a href="/auth/login">Already have an account? Log in</a>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, nickname }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`success ${JSON.stringify(data)}`);
    } else {
      console.error(`fail ${JSON.stringify(data)}`);
    }
  };
  return (
    <>
      <h1 className="text-2xl">Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-5">
          <label>Email</label>
          <input
            className="text-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label>Password</label>
          <input
            className="text-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label>Nickname</label>
          <input
            className="text-blue-500"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

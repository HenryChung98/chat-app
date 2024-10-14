"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// to get user data
import { useUser } from "@/app/context/UserContext";
// components
import LogoutForm from "./auth/logout/page";

export default function Home() {
  // to get user data
  const { user, loading } = useUser();

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Home Page</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {user ? (
          <>
            <p>Welcome, {user.nickname}!</p>
            <p> {user.email}!</p>
            <p> {user.id}!</p>
            <p> {user.createdAt.toString()}!</p>
            <LogoutForm />
            <Link href="/dashboard">Go to Dashboard</Link>
          </>
        ) : (
          <>
            <p>You are not logged in.</p>
            <Link href="/auth/login">Login</Link>
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

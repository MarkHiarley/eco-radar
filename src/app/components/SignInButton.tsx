"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function SignInButton({
  children,
  variant = "flame",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "flame" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 cursor-pointer";
  const styles =
    variant === "flame"
      ? "bg-[#ea580c] text-white hover:bg-[#c2410c] hover:-translate-y-px shadow-[0_10px_30px_-10px_rgba(234,88,12,0.7)]"
      : "border border-[#1c1917] text-[#1c1917] hover:bg-[#1c1917] hover:text-white";
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/users" })}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
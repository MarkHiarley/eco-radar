"use client";
import React from "react";
import { signIn } from "next-auth/react";
import GoogleLogo from "@/app/assets/google-logo.png";
import Image from "next/image";

const GoogleButton = ({ compact = false }: { compact?: boolean }) => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/users" })}
      className={`inline-flex items-center gap-3 rounded-md bg-ink text-white font-semibold transition-all duration-200 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_16px_-4px_rgba(234,88,12,0.5)] hover:-translate-y-px ${
        compact ? "px-4 py-2 text-sm" : "px-7 py-3.5 text-base"
      }`}
      style={{ background: "#1c1917" }}
    >
      <Image src={GoogleLogo} alt="" width={22} height={22} aria-hidden />
      <span>Entrar com Google</span>
    </button>
  );
};

export default GoogleButton;
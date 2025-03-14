"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function LockPage() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate random 8-digit code when page loads or refreshes
  useEffect(() => {
    const newCode = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setAccessCode(newCode);
    console.log("Access code generated:", newCode); // For easier testing
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if input matches access code
    if (inputCode === accessCode) {
      // Set a cookie to grant admin access
      document.cookie = "atlas-admin-access=true; path=/; max-age=3600"; // Expires after 1 hour

      toast.success("Access granted! Redirecting to admin dashboard...");

      // Redirect to admin dashboard after a brief delay
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else {
      toast.error("Incorrect access code. Please try again.");
      setInputCode("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4">
      {/* Background pattern - similar to the image */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent transform rotate-45"></div>
          {/* Create grid dots pattern */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMGZmMDAiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      <Card className="w-full max-w-md bg-black/40 backdrop-blur-sm border border-green-500/30 shadow-xl shadow-green-500/10 relative z-10">
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-600"></div>
        <CardHeader className="border-b border-green-500/20">
          <CardTitle className="text-center text-2xl text-white flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Atlas Admin Access
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-black/60 border border-green-500/50 text-green-500 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Security Verification
            </h2>
            <p className="text-gray-400 mb-3">
              Enter the 8-digit access code displayed below:
            </p>

            <div className="my-6 bg-black/60 p-4 rounded-md border border-green-500/30">
              <code className="text-2xl font-mono tracking-widest font-bold text-green-400">
                {accessCode}
              </code>
            </div>

            <p className="text-sm text-gray-500">
              This code will change if you refresh the page
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter access code"
                className="text-center text-lg bg-black/60 border-green-500/30 focus:border-green-500 focus:ring-green-500 text-white font-mono tracking-widest"
                maxLength={8}
                pattern="[0-9]{8}"
                required
              />
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Access Admin Dashboard"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500 border-t border-green-500/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Secure Connection</span>
          </div>
          <p>Atlas System © {new Date().getFullYear()}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

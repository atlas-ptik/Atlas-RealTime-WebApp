"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-green-500/20 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Atlas Logo"
              width={30}
              height={30}
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Atlas <span className="text-white">System</span>
            </h1>
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="block lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-green-400 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === "/"
                  ? "text-green-400 bg-green-900/20"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-900/10"
              }`}
            >
              Home
            </Link>
            <Link
              href="/download"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === "/download"
                  ? "text-green-400 bg-green-900/20"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-900/10"
              }`}
            >
              Download App
            </Link>
            <Link href="/admin" passHref>
              <Button className="bg-black border border-green-500 text-green-500 hover:bg-green-950 transition-all duration-300">
                Admin Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4 py-2 bg-[#050816] border-t border-green-500/20">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md transition-colors ${
                pathname === "/"
                  ? "text-green-400 bg-green-900/20"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-900/10"
              }`}
            >
              Home
            </Link>
            <Link
              href="/download"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md transition-colors ${
                pathname === "/download"
                  ? "text-green-400 bg-green-900/20"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-900/10"
              }`}
            >
              Download App
            </Link>
            <div className="px-3 py-3">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                passHref
              >
                <Button className="w-full bg-black border border-green-500 text-green-500 hover:bg-green-950 transition-all duration-300">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

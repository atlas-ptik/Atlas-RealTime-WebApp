"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-green-500/20">
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

          <nav className="flex items-center space-x-4">
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
    </header>
  );
}

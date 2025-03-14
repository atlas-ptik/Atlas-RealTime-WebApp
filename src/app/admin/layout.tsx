import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      {/* Background pattern - similar to the image */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent transform rotate-45"></div>
          {/* Create grid dots pattern */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMGZmMDAiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      <header className="border-b border-green-500/30 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Atlas
                </span>
                <span className="text-white"> Admin</span>
              </h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" passHref>
                <Button className="bg-black border border-green-500 text-green-500 hover:bg-green-950 transition-all duration-300">
                  View Site
                </Button>
              </Link>
              <Button
                className="bg-black border border-red-500/50 text-red-400 hover:bg-red-950/30 transition-all duration-300"
                onClick={() => {
                  document.cookie =
                    "atlas-admin-access=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 container mx-auto p-6 text-white">
        {children}
      </main>

      <footer className="border-t border-green-500/30 py-4 text-center text-gray-400 text-sm relative z-10">
        <p>
          Atlas Real-Time Information System Admin © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

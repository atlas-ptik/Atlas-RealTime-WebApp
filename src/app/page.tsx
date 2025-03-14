"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtime } from "@/hooks/useRealtime";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define information item interface
interface InfoItem {
  id?: string;
  title: string;
  content: string;
  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
}

export default function Home() {
  // For current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Use the custom hook to get real-time data
  const { data: infoItems, loading, error } = useRealtime<InfoItem>("info");

  // Format timestamp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleString();
      }
      return "Invalid timestamp";
    } catch (err) {
      return "Invalid timestamp";
    }
  };

  // Sort items by updatedAt timestamp (newest first)
  const sortedItems = [...infoItems].sort((a, b) => {
    if (!a.updatedAt && !b.updatedAt) return 0;
    if (!a.updatedAt) return 1;
    if (!b.updatedAt) return -1;
    return b.updatedAt.seconds - a.updatedAt.seconds;
  });

  // System stats
  const stats = [
    { value: infoItems.length, label: "Total Updates" },
    {
      value:
        infoItems.length > 0
          ? formatTimestamp(sortedItems[0].updatedAt).split(",")[0]
          : "N/A",
      label: "Latest Update",
    },
    { value: "100%", label: "Uptime" },
  ];

  // Features
  const features = [
    {
      title: "Real-Time Updates",
      description: "No more Refresh, Delay Pooling, and Time Consuming Delay",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Secure System",
      description: "Built with enterprise-grade security standards",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Advanced Analytics",
      description: "Monitor system performance and usage",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-green-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-green-400 text-xl font-bold">
            Loading Atlas System...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="bg-zinc-900 border border-red-500 p-6 rounded-lg max-w-md">
          <h2 className="text-xl text-red-500 font-bold mb-2">System Error</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Background pattern - similar to the image */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent transform rotate-45"></div>
          {/* Create grid dots pattern */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMGZmMDAiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 border-b border-green-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Atlas <span className="text-white">System</span>
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">
                {currentTime.toLocaleTimeString()}
              </span>
              <Link href="/lock" passHref>
                <Button className="bg-black border border-green-500 text-green-500 hover:bg-green-950 transition-all duration-300">
                  Admin Dashboard
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-sm text-green-400 uppercase tracking-wider mb-2 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Powered by Firebase
            </h2>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              The Future of <br />
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Real-Time Information
              </span>{" "}
              Is Here
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Experience the power of instant data with Atlas - a system trusted
              for its update speed, reliability, and security.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-2.5 rounded-full">
                View Updates
              </Button>
              <Button className="bg-transparent border border-green-500 text-green-400 hover:bg-green-950 px-6 py-2.5 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-green-500/30 p-6 rounded-lg"
              >
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-green-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10">
            <h2 className="text-3xl font-bold">
              Take control of your{" "}
              <span className="text-green-400">information</span>
            </h2>
            <div className="ml-4 flex items-center text-sm text-green-400">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Updates
            </div>
          </div>

          {sortedItems.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-lg p-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-green-500/50 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-white mb-2">
                No information available yet
              </h3>
              <p className="text-gray-400 max-w-lg mx-auto">
                The system is ready to display real-time information. Updates
                added in the admin panel will appear here instantly.
              </p>

              {/* Sample data display */}
              <div className="mt-10 max-w-md mx-auto">
                <div className="border border-dashed border-green-500/30 p-4 rounded-lg">
                  <div className="h-4 w-3/4 bg-green-500/20 rounded mb-3"></div>
                  <div className="h-3 w-full bg-green-500/10 rounded mb-2"></div>
                  <div className="h-3 w-5/6 bg-green-500/10 rounded mb-2"></div>
                  <div className="h-3 w-4/6 bg-green-500/10 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="bg-black/40 backdrop-blur-sm border border-green-500/30 overflow-hidden group hover:border-green-500/60 transition-all duration-300"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-600"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{item.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        <span>Live</span>
                      </div>
                      <span>Updated: {formatTimestamp(item.updatedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">
            Fully <span className="text-green-400">integrated</span>. Completely{" "}
            <span className="text-green-400">reliable</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg hover:border-green-500/40 transition-all duration-300"
              >
                <div className="mb-4 text-green-500">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-400">
                Atlas Real-Time Information System © {new Date().getFullYear()}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>
                Version 1.0.0 • Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

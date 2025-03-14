"use client";

import React from "react";
import Navbar from "@/components/layouts/navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DownloadPage() {
  const router = useRouter();

  const features = [
    {
      title: "Real-Time Updates",
      description:
        "Get instant information updates directly on your Android device",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-400"
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
      title: "Lightweight",
      description: "Small app size with minimal resource usage",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: "Secure",
      description: "Built with security best practices",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-400"
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
  ];

  const installSteps = [
    {
      title: "Download APK",
      description:
        "Click the download button to get the Atlas-Realtime APK file",
    },
    {
      title: "Allow Installation",
      description:
        "You may need to enable 'Install from Unknown Sources' in your settings",
    },
    {
      title: "Install App",
      description:
        "Open the downloaded APK file and follow the installation prompts",
    },
    {
      title: "Enjoy Real-Time Updates",
      description:
        "Open the app and start receiving real-time information updates",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent transform rotate-45"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMGZmMDAiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">
              Get the Atlas <span className="text-green-400">Mobile App</span>
            </h1>
            <p className="text-gray-300 mb-8">
              Stay connected with real-time updates on your Android device. The
              Atlas Realtime mobile app gives you instant access to all the
              information you need, wherever you are.
            </p>

            <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Important Security Note
              </h3>
              <p className="text-gray-300 mb-4">
                When installing apps from outside the Google Play Store, your
                device may display a security warning. This is normal and
                doesn't indicate a problem with our app.
              </p>
              <p className="text-gray-300">
                The Atlas Realtime app is completely safe to install. The
                warning appears because the app isn't registered with the Play
                Store, not because of any security issues with the app itself.
              </p>
            </div>

            <a
              href="https://drive.google.com/file/d/1UBT0XKtvNGW5MLBfS_6KHQbx0X3T_R0F/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-3 rounded-full text-lg shadow-lg shadow-green-500/20 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download APK
              </Button>
            </a>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-green-500/20 blur-xl"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-green-500/30 p-8 rounded-xl">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-6">
                  Atlas <span className="text-green-400">Realtime</span> for
                  Android
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black/40 p-3 rounded-md">
                    <p className="text-lg font-bold text-white">Version</p>
                    <p className="text-green-400">1.0.0</p>
                  </div>
                  <div className="bg-black/40 p-3 rounded-md">
                    <p className="text-lg font-bold text-white">Size</p>
                    <p className="text-green-400">21 MB</p>
                  </div>
                  <div className="bg-black/40 p-3 rounded-md">
                    <p className="text-lg font-bold text-white">Android</p>
                    <p className="text-green-400">6.0+</p>
                  </div>
                  <div className="bg-black/40 p-3 rounded-md">
                    <p className="text-lg font-bold text-white">Updated</p>
                    <p className="text-green-400">Mar 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Steps */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10">
            Installation <span className="text-green-400">Guide</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {installSteps.map((step, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg relative overflow-hidden"
              >
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-lg font-bold text-green-400">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Features */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10">
            App <span className="text-green-400">Features</span>
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
      </div>
    </div>
  );
}

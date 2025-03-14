import type { Metadata } from "next";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Atlas Realtime",
  description:
    "Real-time web application technology enables dynamic, instantaneous data exchange between a server and a client, allowing updates to be reflected on the user interface without requiring manual refreshes.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-[#050816] text-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

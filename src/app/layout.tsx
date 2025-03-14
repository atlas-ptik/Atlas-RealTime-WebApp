import type { Metadata } from "next";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Realtime WebApp",
  description: "Real-time web application technology enables dynamic, instantaneous data exchange between a server and a client, allowing updates to be reflected on the user interface without requiring manual refreshes. This is typically achieved through protocols such as WebSockets or server-sent events, which maintain a persistent connection for bidirectional communication. Such technology underpins applications like live chat systems, collaborative tools, and real-time data dashboards, enhancing user experience by providing seamless, up-to-the-moment interactions.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

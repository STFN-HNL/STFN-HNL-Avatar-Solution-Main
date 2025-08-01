import "@/styles/globals.css";
import { Metadata } from "next";
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

import { EnvironmentUtils } from "@/app/lib/environment-utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Dynamic metadata based on environment
export async function generateMetadata(): Promise<Metadata> {
  const title = EnvironmentUtils.getTitle();
  const branding = EnvironmentUtils.getBranding();
  
  return {
    title: {
      default: title,
      template: `%s - ${branding?.companyName || 'Avatar Solution'}`,
    },
    description: `Interactive Avatar solution - ${branding?.companyName || 'Demo'}`,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans`}
      lang="en"
    >
      <head>
      </head>
      <body className="min-h-screen bg-neutral text-primary-dark antialiased">
        <main className="relative flex flex-col gap-6 h-screen w-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

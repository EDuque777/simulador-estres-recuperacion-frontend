import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { ReduxProvider } from "./providers/ReduxProvider";
import { AuthSessionInitializer } from "@/features/auth/components/AuthSessionInitializer";
import { AuthFlowModals } from "@/features/auth/components/AuthFlowModals";
import { AppPreloader } from "@/shared/ui/loaders/AppPreloader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simulador Estres y Recuperacion",
  description: "Proyecto Ecuaciones Diferenciales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-manrope">
        <ReduxProvider>
          <AuthSessionInitializer />
          <AppPreloader minDuration={500} />
          {children}
          <AuthFlowModals />
        </ReduxProvider>
      </body>
    </html>
  );
}

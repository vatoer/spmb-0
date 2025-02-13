import { auth } from "@/modules/auth/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/custom.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siap SPMB - Sistem Penerimaan Murid Baru",
  description: "Sistem Penerimaan Murid Baru",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-2516665386 */}
        <SessionProvider session={session} key={session?.user?.id}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

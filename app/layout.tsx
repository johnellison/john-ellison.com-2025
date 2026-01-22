import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Ellison | AI Transformation & Product Strategy",
  description: "Helping companies transform with AI through strategic consulting, hands-on development, and organizational readiness assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

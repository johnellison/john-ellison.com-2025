import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Ellison | AI Transformation & Product Strategy",
  description: "Helping companies transform with AI through strategic consulting, hands-on development, and organizational readiness assessment.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon-32.png',
  },
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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF Lab - Free PDF Tools",
  description:
    "Merge, split, compress, convert PDFs. All processing done locally.",
  icons: {
    icon: "/favicon.ico",
    apple: "/pdf-lab-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}

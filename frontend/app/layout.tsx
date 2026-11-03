import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Free Online PDF Tools",
    template: "%s | PDF Lab",
  },
  description: "Merge, split, compress, and convert PDF files with free online tools from PDF Lab.",
  applicationName: "PDF Lab",
  keywords: ["free PDF tools", "merge PDF", "split PDF", "compress PDF", "convert PDF"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PDF Lab",
    title: "Free Online PDF Tools | PDF Lab",
    description:
      "Merge, split, compress, and convert PDF files with free online tools from PDF Lab.",
    images: ["/pdf-lab-icon.png"],
  },
  twitter: {
    card: "summary",
    title: "Free Online PDF Tools | PDF Lab",
    description:
      "Merge, split, compress, and convert PDF files with free online tools from PDF Lab.",
    images: ["/pdf-lab-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/pdf-lab-icon.png",
  },
  verification: {
    google: "yKOHr6XY2H0EL2VwtjjFDZkJFklTn1Ec6zig88enJ1Y",
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

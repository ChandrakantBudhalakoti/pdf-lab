import type { Metadata } from "next";

export const SITE_URL = new URL("https://pdf-lab-alpha.vercel.app");

export function createToolMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | PDF Lab`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: new URL(path, SITE_URL).toString(),
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

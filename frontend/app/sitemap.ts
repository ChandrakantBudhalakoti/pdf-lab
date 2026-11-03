import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes = [
  "/",
  "/tools/merge",
  "/tools/split",
  "/tools/compress",
  "/tools/pdf-to-jpg",
  "/tools/jpg-to-pdf",
  "/tools/watermark",
  "/tools/lock",
  "/tools/unlock",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: new URL(route, SITE_URL).toString(),
    priority: index === 0 ? 1 : 0.8,
  }));
}

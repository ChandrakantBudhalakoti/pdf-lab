"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  url: string;
  filename: string;
  label?: string;
}

export function DownloadButton({
  url,
  filename,
  label = "Download PDF",
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleClick = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={downloading}
      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-70 disabled:cursor-wait"
    >
      <Download className="h-5 w-5" />
      {downloading ? "Downloading..." : label}
    </button>
  );
}

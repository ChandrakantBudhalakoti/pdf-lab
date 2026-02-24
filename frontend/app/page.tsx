import Link from "next/link";
import Image from "next/image";
import {
  Merge,
  Scissors,
  Zap,
  Image as ImageIcon,
  Stamp,
  Lock,
  LockOpen,
} from "lucide-react";

const TOOLS = [
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one",
    href: "/tools/merge",
    icon: "merge",
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract pages into separate files",
    href: "/tools/split",
    icon: "split",
  },
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce file size",
    href: "/tools/compress",
    icon: "compress",
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to images",
    href: "/tools/pdf-to-jpg",
    icon: "image",
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert images to PDF",
    href: "/tools/jpg-to-pdf",
    icon: "image",
  },
  {
    id: "watermark",
    title: "Watermark PDF",
    description: "Add overlay to pages",
    href: "/tools/watermark",
    icon: "watermark",
  },
  {
    id: "lock",
    title: "Lock PDF",
    description: "Add password protection",
    href: "/tools/lock",
    icon: "lock",
  },
  {
    id: "unlock",
    title: "Unlock PDF",
    description: "Remove password",
    href: "/tools/unlock",
    icon: "unlock",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  merge: <Merge className="h-8 w-8" />,
  split: <Scissors className="h-8 w-8" />,
  compress: <Zap className="h-8 w-8" />,
  image: <ImageIcon className="h-8 w-8" />,
  watermark: <Stamp className="h-8 w-8" />,
  lock: <Lock className="h-8 w-8" />,
  unlock: <LockOpen className="h-8 w-8" />,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/pdf-lab-logo.png"
              alt="PDF Lab"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free PDF tools for everyone
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Merge, split, compress, and convert PDFs. All processing runs
            locally on your device — no uploads to external servers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/5"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-100 group-hover:text-red-700">
                {ICONS[tool.icon] ?? ICONS.image}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-red-600">
                {tool.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

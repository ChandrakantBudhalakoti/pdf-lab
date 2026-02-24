import Link from "next/link";
import {
  Merge,
  Scissors,
  Zap,
  Image as ImageIcon,
  Stamp,
  Lock,
  LockOpen,
  ArrowRight,
} from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface SuggestionsCardProps {
  currentToolId: string;
}

const TOOLS: Tool[] = [
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
  merge: <Merge className="h-6 w-6" />,
  split: <Scissors className="h-6 w-6" />,
  compress: <Zap className="h-6 w-6" />,
  image: <ImageIcon className="h-6 w-6" />,
  watermark: <Stamp className="h-6 w-6" />,
  lock: <Lock className="h-6 w-6" />,
  unlock: <LockOpen className="h-6 w-6" />,
};

export function SuggestionsCard({ currentToolId }: SuggestionsCardProps) {
  const suggestedTools = TOOLS.filter(
    (tool) => tool.id !== currentToolId,
  ).slice(0, 3);

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Explore other tools
        </h2>
        <p className="mt-2 text-slate-600">
          Discover more PDF tools to enhance your workflow
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestedTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-red-500 hover:shadow-md hover:shadow-red-500/5"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-100 group-hover:text-red-700">
              {ICONS[tool.icon] ?? ICONS.image}
            </div>
            <h3 className="font-semibold text-slate-900 group-hover:text-red-600">
              {tool.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{tool.description}</p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-red-600 opacity-0 transition-opacity group-hover:opacity-100">
              Try it
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white shadow-sm transition hover:bg-red-700"
        >
          View all tools
        </Link>
      </div>
    </div>
  );
}

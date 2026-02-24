import Link from "next/link";
import Image from "next/image";
import { SuggestionsCard } from "./SuggestionsCard";

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  currentToolId: string;
}

export function ToolLayout({
  children,
  title,
  description,
  currentToolId,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/pdf-lab-logo.png"
              alt="PDF Lab"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ← All tools
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-slate-600">{description}</p>
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {children}
        </div>
        <SuggestionsCard currentToolId={currentToolId} />
      </main>
    </div>
  );
}

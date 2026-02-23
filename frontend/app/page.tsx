import Link from "next/link";

const TOOLS = [
  { id: "merge", title: "Merge PDF", description: "Combine multiple PDFs into one", href: "/tools/merge", icon: "merge" },
  { id: "split", title: "Split PDF", description: "Extract pages into separate files", href: "/tools/split", icon: "split" },
  { id: "compress", title: "Compress PDF", description: "Reduce file size", href: "/tools/compress", icon: "compress" },
  { id: "pdf-to-jpg", title: "PDF to JPG", description: "Convert PDF pages to images", href: "/tools/pdf-to-jpg", icon: "image" },
  { id: "jpg-to-pdf", title: "JPG to PDF", description: "Convert images to PDF", href: "/tools/jpg-to-pdf", icon: "image" },
  { id: "watermark", title: "Watermark PDF", description: "Add overlay to pages", href: "/tools/watermark", icon: "watermark" },
  { id: "lock", title: "Lock PDF", description: "Add password protection", href: "/tools/lock", icon: "lock" },
  { id: "unlock", title: "Unlock PDF", description: "Remove password", href: "/tools/unlock", icon: "unlock" },
];

const ICONS: Record<string, React.ReactNode> = {
  merge: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  split: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  compress: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  image: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  watermark: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  lock: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  unlock: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">PDF Lab</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free PDF tools for everyone
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Merge, split, compress, and convert PDFs. All processing runs locally on your device — no uploads to external servers.
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

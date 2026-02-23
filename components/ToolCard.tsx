import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

export function ToolCard({ title, description, href }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-red-500 hover:shadow-md"
    >
      <h3 className="font-semibold text-gray-900 group-hover:text-red-600">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </Link>
  );
}

import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Split PDF pages online",
  "Split a PDF into separate pages with PDF Lab's free online PDF splitter.",
  "/tools/split"
);

export default function SplitPage() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Extract each page into a separate PDF file."
      currentToolId="split"
    >
      <ToolPageClient endpoint="/api/split" accept=".pdf" label="Select a PDF file" />
    </ToolLayout>
  );
}

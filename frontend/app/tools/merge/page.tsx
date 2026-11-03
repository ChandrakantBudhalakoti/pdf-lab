import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Merge PDF files online",
  "Combine multiple PDF files into one document with PDF Lab's free online PDF merger.",
  "/tools/merge"
);

export default function MergePage() {
  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into one. Add files one by one or select multiple at once."
      currentToolId="merge"
    >
      <ToolPageClient
        endpoint="/api/merge"
        accept=".pdf"
        multiple
        maxCount={10}
        label="Select PDF files (2 or more required)"
        addMoreLabel="Add more PDF files"
      />
    </ToolLayout>
  );
}

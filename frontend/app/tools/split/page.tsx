import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export default function SplitPage() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Extract each page into a separate PDF file."
    >
      <ToolPageClient
        endpoint="/api/split"
        accept=".pdf"
        label="Select a PDF file"
      />
    </ToolLayout>
  );
}

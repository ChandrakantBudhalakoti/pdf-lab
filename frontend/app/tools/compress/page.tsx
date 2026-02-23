import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export default function CompressPage() {
  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size while keeping good quality."
    >
      <ToolPageClient
        endpoint="/api/compress"
        accept=".pdf"
        label="Select a PDF file"
      />
    </ToolLayout>
  );
}

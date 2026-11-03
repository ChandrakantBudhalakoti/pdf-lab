import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Add a watermark to PDF online",
  "Apply a watermark PDF to every page of your document with PDF Lab's free online tool.",
  "/tools/watermark"
);

export default function WatermarkPage() {
  return (
    <ToolLayout
      title="Watermark PDF"
      description="Overlay a watermark PDF on each page of your document."
      currentToolId="watermark"
    >
      <ToolPageClient
        endpoint="/api/watermark"
        accept=".pdf"
        label="Select your PDF file"
        needsWatermark
        watermarkLabel="Select watermark PDF (will be overlaid on each page)"
      />
    </ToolLayout>
  );
}

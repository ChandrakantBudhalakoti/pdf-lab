import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export default function WatermarkPage() {
  return (
    <ToolLayout
      title="Watermark PDF"
      description="Overlay a watermark PDF on each page of your document."
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

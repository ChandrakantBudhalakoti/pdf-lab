import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Compress PDF files online",
  "Reduce the file size of a PDF with PDF Lab's free online PDF compressor.",
  "/tools/compress"
);

export default function CompressPage() {
  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size while keeping good quality."
      currentToolId="compress"
    >
      <ToolPageClient endpoint="/api/compress" accept=".pdf" label="Select a PDF file" />
    </ToolLayout>
  );
}

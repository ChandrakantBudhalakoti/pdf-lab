import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Convert PDF to JPG online",
  "Convert PDF pages to JPG images with PDF Lab's free online PDF to JPG converter.",
  "/tools/pdf-to-jpg"
);

export default function PdfToJpgPage() {
  return (
    <ToolLayout
      title="PDF to JPG"
      description="Convert each PDF page to a JPG image."
      currentToolId="pdf-to-jpg"
    >
      <ToolPageClient endpoint="/api/pdf-to-jpg" accept=".pdf" label="Select a PDF file" />
    </ToolLayout>
  );
}

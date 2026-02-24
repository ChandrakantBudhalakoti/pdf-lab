import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export default function PdfToJpgPage() {
  return (
    <ToolLayout
      title="PDF to JPG"
      description="Convert each PDF page to a JPG image."
      currentToolId="pdf-to-jpg"
    >
      <ToolPageClient
        endpoint="/api/pdf-to-jpg"
        accept=".pdf"
        label="Select a PDF file"
      />
    </ToolLayout>
  );
}

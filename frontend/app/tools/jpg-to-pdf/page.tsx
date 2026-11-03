import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Convert JPG to PDF online",
  "Combine JPG images into a PDF document with PDF Lab's free online JPG to PDF converter.",
  "/tools/jpg-to-pdf"
);

export default function JpgToPdfPage() {
  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG images to a single PDF document."
      currentToolId="jpg-to-pdf"
    >
      <ToolPageClient
        endpoint="/api/jpg-to-pdf"
        accept=".jpg,.jpeg"
        multiple
        maxCount={20}
        label="Select JPG images"
        addMoreLabel="Add more images"
      />
    </ToolLayout>
  );
}

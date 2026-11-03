import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Password protect a PDF online",
  "Add password protection to a PDF with PDF Lab's free online PDF security tool.",
  "/tools/lock"
);

export default function LockPage() {
  return (
    <ToolLayout
      title="Lock PDF"
      description="Add password protection to your PDF."
      currentToolId="lock"
    >
      <ToolPageClient
        endpoint="/api/lock"
        accept=".pdf"
        label="Select a PDF file"
        needsPassword
        passwordLabel="User password (required to open)"
        needsOwnerPassword
      />
    </ToolLayout>
  );
}

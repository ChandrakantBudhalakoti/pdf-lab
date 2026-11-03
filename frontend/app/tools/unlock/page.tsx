import { createToolMetadata } from "@/lib/seo";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export const metadata = createToolMetadata(
  "Unlock a PDF online",
  "Remove password protection from a PDF you are authorized to access with PDF Lab's free online tool.",
  "/tools/unlock"
);

export default function UnlockPage() {
  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove password protection from a PDF."
      currentToolId="unlock"
    >
      <ToolPageClient
        endpoint="/api/unlock"
        accept=".pdf"
        label="Select a password-protected PDF"
        needsPassword
        passwordLabel="PDF password"
      />
    </ToolLayout>
  );
}

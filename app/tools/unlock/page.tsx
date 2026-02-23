import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export default function UnlockPage() {
  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove password protection from a PDF."
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

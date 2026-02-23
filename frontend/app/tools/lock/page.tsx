import { ToolLayout } from "@/components/ToolLayout";
import { ToolPageClient } from "@/components/ToolPageClient";

export default function LockPage() {
  return (
    <ToolLayout
      title="Lock PDF"
      description="Add password protection to your PDF."
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

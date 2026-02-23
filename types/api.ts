export type ToolId =
  | "merge"
  | "split"
  | "compress"
  | "pdf-to-jpg"
  | "jpg-to-pdf"
  | "watermark"
  | "lock"
  | "unlock";

export interface ToolConfig {
  id: ToolId;
  title: string;
  description: string;
  href: string;
  accepts: "pdf" | "images" | "pdf+watermark";
  multiple?: boolean;
}

export interface ApiSuccessSingle {
  success: true;
  downloadUrl: string;
  filename: string;
}

export interface ApiSuccessMultiple {
  success: true;
  files: { filename: string; downloadUrl: string }[];
}

export type ApiResponse = ApiSuccessSingle | ApiSuccessMultiple;

import path from "path";

/**
 * Sanitize filename: keep alphanumeric, dash, underscore.
 */
function sanitize(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

/**
 * Get output filename: original base name + "-pdf-lab" + extension.
 */
export function getOutputFilename(originalName: string, ext: string): string {
  const base = path.basename(originalName, path.extname(originalName));
  const safe = sanitize(base) || "file";
  return `${safe}-pdf-lab.${ext}`;
}

/**
 * Get output base name (no extension) for tools that produce multiple files.
 */
export function getOutputBase(originalName: string): string {
  const base = path.basename(originalName, path.extname(originalName));
  const safe = sanitize(base) || "file";
  return `${safe}-pdf-lab`;
}

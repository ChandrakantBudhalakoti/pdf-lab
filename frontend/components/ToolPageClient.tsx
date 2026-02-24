"use client";

import { useState } from "react";
import { File, X, Loader2 } from "lucide-react";
import { FileDropzone } from "./FileDropzone";
import { DownloadButton } from "./DownloadButton";
import { uploadFiles } from "@/services/api";
import type { ApiResponse } from "@/types/api";

interface ToolPageClientProps {
  endpoint: string;
  accept: string;
  multiple?: boolean;
  maxCount?: number;
  label: string;
  addMoreLabel?: string;
  watermarkLabel?: string;
  needsWatermark?: boolean;
  needsPassword?: boolean;
  passwordLabel?: string;
  needsOwnerPassword?: boolean;
}

export function ToolPageClient({
  endpoint,
  accept,
  multiple = false,
  maxCount = 1,
  label,
  addMoreLabel,
  watermarkLabel,
  needsWatermark = false,
  needsPassword = false,
  passwordLabel = "Password",
  needsOwnerPassword = false,
}: ToolPageClientProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = multiple
    ? (newFiles: File[]) =>
        setFiles((prev) => [...prev, ...newFiles].slice(0, maxCount))
    : (newFiles: File[]) => setFiles(newFiles);

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const canSubmit = multiple
    ? files.length >= (endpoint === "/api/merge" ? 2 : 1)
    : files.length === 1;
  const submitDisabled =
    !canSubmit ||
    loading ||
    (needsWatermark && !watermarkFile) ||
    (needsPassword && !password.trim());

  const handleSubmit = async () => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();

      if (multiple) {
        files.forEach((f) => formData.append("files", f));
      } else {
        formData.append("file", files[0]);
      }

      if (needsWatermark && watermarkFile) {
        formData.append("watermark", watermarkFile);
      }
      if (endpoint === "/api/lock") {
        formData.append("userPassword", password);
        formData.append("ownerPassword", ownerPassword || password);
      } else if (endpoint === "/api/unlock") {
        formData.append("password", password);
      }

      const data = await uploadFiles(endpoint, formData);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const hasSingleDownload = result && "downloadUrl" in result;
  const hasMultipleDownloads = result && "files" in result;

  return (
    <div className="space-y-6">
      {files.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-medium text-slate-700">
            {files.length} file{files.length > 1 ? "s" : ""} selected
            {multiple && maxCount > 1 && ` (max ${maxCount})`}
          </p>
          <ul className="mt-2 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${f.size}-${i}`}
                className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
              >
                <span className="flex items-center gap-2 truncate">
                  <File className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="truncate">{f.name}</span>
                  <span className="text-slate-400">#{i + 1}</span>
                </span>
                {multiple && (
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="shrink-0 rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove file"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <FileDropzone
        onFiles={handleFilesChange}
        accept={accept}
        multiple={multiple}
        maxCount={maxCount}
        label={files.length > 0 && addMoreLabel ? addMoreLabel : label}
        disabled={loading}
        existingCount={multiple ? files.length : 0}
      />

      {needsWatermark && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-700">
            Watermark PDF
          </h3>
          <FileDropzone
            onFiles={(f) => setWatermarkFile(f[0] ?? null)}
            accept=".pdf"
            multiple={false}
            label={watermarkLabel ?? "Select watermark PDF"}
            disabled={loading}
          />
        </div>
      )}

      {needsPassword && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              placeholder={passwordLabel}
              disabled={loading}
            />
          </div>
          {needsOwnerPassword && endpoint === "/api/lock" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Owner password (optional)
              </label>
              <input
                type="password"
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Leave empty to use user password"
                disabled={loading}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitDisabled}
        className="w-full rounded-xl bg-red-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </span>
        ) : (
          "Process"
        )}
      </button>

      {hasSingleDownload && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-emerald-800">Done!</p>
              <p className="mt-1 text-sm text-emerald-700">
                Your file is ready to download.
              </p>
            </div>
            <DownloadButton
              url={(result as { downloadUrl: string }).downloadUrl}
              filename={(result as { filename: string }).filename}
            />
          </div>
        </div>
      )}

      {hasMultipleDownloads && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-emerald-800">Done!</p>
          <p className="mt-1 text-sm text-emerald-700">
            Your files are ready to download.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {(
              result as { files: { filename: string; downloadUrl: string }[] }
            ).files.map((f) => (
              <DownloadButton
                key={f.filename}
                url={f.downloadUrl}
                filename={f.filename}
                label={f.filename}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

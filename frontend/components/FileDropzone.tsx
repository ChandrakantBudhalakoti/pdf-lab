"use client";

import { useCallback, useState } from "react";

interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  maxCount?: number;
  label: string;
  disabled?: boolean;
  existingCount?: number;
}

export function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  maxCount = 1,
  label,
  disabled = false,
  existingCount = 0,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndEmit = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const arr = Array.from(files);
      if (!multiple && arr.length > 1) {
        setError("Please select only one file");
        return;
      }
      if (multiple && existingCount + arr.length > maxCount) {
        setError(`Maximum ${maxCount} file(s) allowed. You can add ${maxCount - existingCount} more.`);
        return;
      }
      if (!multiple && arr.length > maxCount) {
        setError(`Maximum ${maxCount} file(s) allowed`);
        return;
      }
      onFiles(arr);
    },
    [multiple, maxCount, existingCount, onFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const files = e.dataTransfer.files;
      if (files.length) validateAndEmit(files);
    },
    [disabled, validateAndEmit]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.length) validateAndEmit(files);
      e.target.value = "";
    },
    [validateAndEmit]
  );

  return (
    <div className="w-full">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all duration-200
          ${isDragging ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"}
          ${disabled ? "cursor-not-allowed opacity-60" : ""}
        `}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-medium text-slate-700">{label}</p>
          <p className="mt-1 text-sm text-slate-500">
            {existingCount > 0
              ? "Drag & drop or click to add more"
              : "Drag & drop or click to browse"}
          </p>
        </div>
      </label>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}

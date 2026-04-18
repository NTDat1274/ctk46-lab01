"use client";

import { useState } from "react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Tự động reset chữ sau 2 giây
    } catch (err) {
      console.error("Lỗi khi copy: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`ml-3 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
        copied
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {copied ? "✅ Đã lưu" : "📋 Copy"}
    </button>
  );
}

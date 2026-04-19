"use client";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn xóa lời nhắn này?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Không thể xóa lời nhắn");
      }

      await mutate("/api/guestbook");
    } catch {
      alert("Không thể xóa lời nhắn. Vui lòng thử lại.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? "Đang xóa..." : "Xóa"}
    </button>
  );
}

"use client";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";

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
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="destructive"
      size="xs"
    >
      {isDeleting ? "Đang xóa..." : "Xóa"}
    </Button>
  );
}

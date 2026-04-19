"use client";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Không thể xóa lời nhắn");
      }

      await mutate("/api/guestbook");
      setOpen(false);
    } catch {
      alert("Không thể xóa lời nhắn. Vui lòng thử lại.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Yêu cầu 1: Dùng Dialog để xác nhận xóa thay cho confirm(). */}
      <DialogTrigger asChild>
        <Button disabled={isDeleting} variant="destructive" size="xs">
          {isDeleting ? "Đang xóa..." : "Xóa"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận xóa lời nhắn</DialogTitle>
          <DialogDescription>
            Bạn có chắc muốn xóa lời nhắn này không? Hành động này không thể
            hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Hủy
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            {isDeleting ? "Đang xóa..." : "Xóa ngay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { useRef, useState } from "react";
import { useSWRConfig } from "swr";
import SubmitButton from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function GuestbookForm() {
  const { mutate } = useSWRConfig();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submitGuestbook(formData: FormData) {
    const trimmedName = String(formData.get("name") ?? "").trim();
    const trimmedMessage = String(formData.get("message") ?? "").trim();
    if (!trimmedName || !trimmedMessage) return;

    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error || "Không thể gửi lời nhắn");
      }

      formRef.current?.reset();
      setSuccess(true);
      await mutate("/api/guestbook");
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : "Không thể gửi lời nhắn";
      setError(messageText);
    }
  }

  return (
    <form ref={formRef} action={submitGuestbook} className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Để lại lời nhắn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên của bạn</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nhập tên của bạn"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Lời nhắn</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Viết lời nhắn của bạn..."
              required
              rows={3}
            />
          </div>
          {/* Phần 5.8: Dùng component submit tái sử dụng với useFormStatus. */}
          <SubmitButton idleText="Gửi lời nhắn" pendingText="Đang gửi..." />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">Gửi lời nhắn thành công!</p>
          )}
        </CardContent>
      </Card>
    </form>
  );
}

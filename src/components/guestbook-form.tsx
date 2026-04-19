"use client";
import { useRef, useState } from "react";
import { useSWRConfig } from "swr";
import SubmitButton from "@/components/submit-button";

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
    <form
      ref={formRef}
      action={submitGuestbook}
      className="bg-gray-50 rounded-lg p-6 mb-8 space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên của bạn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nhập tên của bạn"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Lời nhắn
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Viết lời nhắn của bạn..."
          required
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      {/* Yêu cầu 3: Dùng component submit tái sử dụng với useFormStatus. */}
      <SubmitButton
        idleText="Gửi lời nhắn"
        pendingText="Đang gửi..."
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">Gửi lời nhắn thành công!</p>
      )}
    </form>
  );
}

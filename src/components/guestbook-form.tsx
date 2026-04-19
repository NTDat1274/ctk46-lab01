"use client";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

export default function GuestbookForm() {
  const { mutate } = useSWRConfig();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    setIsPending(true);
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

      setName("");
      setMessage("");
      setSuccess(true);
      await mutate("/api/guestbook");
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : "Không thể gửi lời nhắn";
      setError(messageText);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Viết lời nhắn của bạn..."
          required
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isPending || !name.trim() || !message.trim()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Đang gửi..." : "Gửi lời nhắn"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">Gửi lời nhắn thành công!</p>
      )}
    </form>
  );
}

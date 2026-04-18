// src/app/guestbook/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import { GuestbookEntry } from "@/data/guestbook";

// Fetcher cơ bản cho SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GuestbookPage() {
  // BÀI TẬP: Phân trang (5 items/trang)
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // BÀI TẬP: Dùng SWR thay thế useEffect. Lấy toàn bộ data rồi tự cắt trang ở Client.
  // (Lưu ý: Nếu data quá lớn, nên thiết kế API phân trang bằng offset/page)
  const {
    data: allEntries,
    error,
    isLoading,
    mutate,
  } = useSWR<GuestbookEntry[]>("/api/guestbook", fetcher);

  // Tính toán dữ liệu cho trang hiện tại
  const entries = allEntries
    ? allEntries.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];
  const totalPages = allEntries
    ? Math.ceil(allEntries.length / itemsPerPage)
    : 1;

  // State cho form
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // BÀI TẬP: Trạng thái loading riêng cho từng nút Xóa
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Xử lý gửi lời nhắn
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi gửi lời nhắn");
      }

      setName("");
      setMessage("");
      // Gọi mutate() để SWR tự động gọi lại API cập nhật danh sách
      mutate();
      setPage(1); // Quay về trang 1 để xem tin nhắn mới nhất
    } catch (err) {
      // Kiểm tra xem err có đúng là một Error object không
      if (err instanceof Error) {
        alert(err.message || "Không thể gửi lời nhắn. Vui lòng thử lại.");
      } else {
        alert("Không thể gửi lời nhắn. Vui lòng thử lại.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Xử lý xóa lời nhắn
  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc muốn xóa lời nhắn này?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa");

      mutate(); // Cập nhật lại danh sách sau khi xóa

      // Chuyển về trang trước nếu trang hiện tại đã hết item (ngoại trừ trang 1)
      if (entries.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (err) {
      alert("Không thể xóa lời nhắn. Vui lòng thử lại.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Sổ lưu bút</h1>
      <p className="text-gray-500 mb-8">Hãy để lại lời nhắn cho tôi nhé!</p>

      {/* Form gửi lời nhắn */}
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
          disabled={submitting || !name.trim() || !message.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Đang gửi..." : "Gửi lời nhắn"}
        </button>
      </form>

      {/* Danh sách lời nhắn */}
      {isLoading && (
        <div className="text-center py-8 text-gray-500">
          Đang tải sổ lưu bút...
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">
          Không thể tải dữ liệu. Vui lòng thử lại.
        </div>
      )}

      {!isLoading && !error && allEntries && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">{allEntries.length} lời nhắn</p>

          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {entry.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deletingId === entry.id}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === entry.id ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{entry.message}</p>
            </div>
          ))}

          {allEntries.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              Chưa có lời nhắn nào. Hãy là người đầu tiên!
            </p>
          )}

          {/* Điều khiển phân trang */}
          {allEntries.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm text-blue-600 disabled:text-gray-400 hover:bg-blue-50 rounded transition-colors disabled:hover:bg-transparent"
              >
                ← Trang trước
              </button>
              <span className="text-sm text-gray-500">
                Trang {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm text-blue-600 disabled:text-gray-400 hover:bg-blue-50 rounded transition-colors disabled:hover:bg-transparent"
              >
                Trang sau →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

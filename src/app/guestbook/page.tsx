// src/app/guestbook/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import { GuestbookEntry } from "@/data/guestbook";
import GuestbookForm from "@/components/guestbook-form";
import DeleteButton from "@/components/delete-button";

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
  } = useSWR<GuestbookEntry[]>("/api/guestbook", fetcher);

  // Tính toán dữ liệu cho trang hiện tại
  const entries = allEntries
    ? allEntries.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];
  const totalPages = allEntries
    ? Math.ceil(allEntries.length / itemsPerPage)
    : 1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Sổ lưu bút</h1>
      <p className="text-gray-500 mb-8">Hãy để lại lời nhắn cho tôi nhé!</p>

      {/* Form gửi lời nhắn bằng Server Action */}
      <GuestbookForm />

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
                  <DeleteButton id={entry.id} />
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

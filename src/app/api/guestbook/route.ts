import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";
// GET /api/guestbook — Lấy danh sách tất cả lời nhắn
export async function GET(request: NextRequest) {
  // BÀI TẬP: Thêm query parameter limit
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get("limit");

  let data = guestbookEntries;

  if (limitParam) {
    const limit = parseInt(limitParam, 10);
    if (!isNaN(limit) && limit > 0) {
      data = guestbookEntries.slice(0, limit);
    }
  }

  return NextResponse.json(data);
}
// POST /api/guestbook — Thêm lời nhắn mới
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, message } = body;
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  // BÀI TẬP: Validation tùy chỉnh (2-50 ký tự cho name, 1-500 ký tự cho message)
  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 50) {
    return NextResponse.json(
      { error: "Tên phải từ 2 đến 50 ký tự" },
      { status: 400 },
    );
  }

  if (
    !trimmedMessage ||
    trimmedMessage.length < 1 ||
    trimmedMessage.length > 500
  ) {
    return NextResponse.json(
      { error: "Lời nhắn phải từ 1 đến 500 ký tự" },
      { status: 400 },
    );
  }

  // Yêu cầu 2: Chặn gửi trùng (cùng name + message) trong vòng 1 phút.
  const now = Date.now();
  const duplicateEntry = guestbookEntries.find((entry) => {
    const isSameContent =
      entry.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
      entry.message.trim().toLowerCase() === trimmedMessage.toLowerCase();
    if (!isSameContent) return false;

    const createdAtMs = new Date(entry.createdAt).getTime();
    if (Number.isNaN(createdAtMs)) return false;

    return now - createdAtMs < 60 * 1000;
  });

  if (duplicateEntry) {
    return NextResponse.json(
      {
        error:
          "Bạn vừa gửi lời nhắn trùng trong vòng 1 phút. Vui lòng thử lại sau.",
      },
      { status: 409 },
    );
  }

  // Tạo entry mới
  const newEntry = {
    id: Date.now().toString(),
    name: trimmedName,
    message: trimmedMessage,
    createdAt: new Date().toISOString(),
  };
  // Thêm vào đầu mảng (hiển thị mới nhất trước)
  guestbookEntries.unshift(newEntry);
  return NextResponse.json(newEntry, { status: 201 });
}

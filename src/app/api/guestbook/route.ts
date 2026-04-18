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

  // BÀI TẬP: Validation tùy chỉnh (2-50 ký tự cho name, 1-500 ký tự cho message)
  if (!name || name.trim().length < 2 || name.trim().length > 50) {
    return NextResponse.json(
      { error: "Tên phải từ 2 đến 50 ký tự" },
      { status: 400 },
    );
  }

  if (!message || message.trim().length < 1 || message.trim().length > 500) {
    return NextResponse.json(
      { error: "Lời nhắn phải từ 1 đến 500 ký tự" },
      { status: 400 },
    );
  }
  // Tạo entry mới
  const newEntry = {
    id: Date.now().toString(),
    name: body.name,
    message: body.message,
    createdAt: new Date().toISOString(),
  };
  // Thêm vào đầu mảng (hiển thị mới nhất trước)
  guestbookEntries.unshift(newEntry);
  return NextResponse.json(newEntry, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";
interface RouteParams {
  params: Promise<{ id: string }>;
}
// DELETE /api/guestbook/[id] — Xóa lời nhắn theo id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const index = guestbookEntries.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Không tìm thấy lời nhắn" },
      { status: 404 },
    );
  }
  const deleted = guestbookEntries.splice(index, 1)[0];
  return NextResponse.json(deleted);
}
// PUT /api/guestbook/[id] - Cập nhật lời nhắn
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const { name, message } = body;

  const entryIndex = guestbookEntries.findIndex((entry) => entry.id === id);

  if (entryIndex === -1) {
    return NextResponse.json(
      { error: "Không tìm thấy lời nhắn để cập nhật" },
      { status: 404 },
    );
  }

  // Cập nhật nếu có dữ liệu truyền lên
  if (name && name.trim().length >= 2 && name.trim().length <= 50) {
    guestbookEntries[entryIndex].name = name.trim();
  }

  if (message && message.trim().length >= 1 && message.trim().length <= 500) {
    guestbookEntries[entryIndex].message = message.trim();
  }

  return NextResponse.json(guestbookEntries[entryIndex]);
}

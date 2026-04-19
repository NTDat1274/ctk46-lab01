"use client";
import { useActionState, useState } from "react";
import { sendContactMessage, ContactFormState } from "./actions";
import SubmitButton from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = {
  success: false,
};

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const [dismissSuccess, setDismissSuccess] = useState(false);
  const showSuccess = state.success && !dismissSuccess;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Liên hệ</h1>
      <p className="text-gray-500 mb-8">
        Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tin nhắn cho tôi!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Yêu cầu 3: Trang Contact dùng Input/Textarea/Button/Label từ shadcn/ui. */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:2212353@dlu.edu.vn"
                className="text-blue-600 hover:underline text-sm"
              >
                2212353@dlu.edu.vn
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>GitHub</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="https://github.com/NTDat1274"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                github.com/NTDat1274
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Địa chỉ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Đại học Đà Lạt, 01 Phù Đổng Thiên Vương, Đà Lạt
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Form liên hệ */}
        <div className="md:col-span-2">
          {showSuccess ? (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-green-700 font-semibold text-lg mb-2">
                  Gửi thành công!
                </h3>
                <p className="text-green-600">
                  Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
                </p>
                {/* Yêu cầu 1: Nút quay lại form để gửi thêm tin nhắn mới. */}
                <Button
                  type="button"
                  onClick={() => setDismissSuccess(true)}
                  variant="outline"
                  className="mt-4 border-green-300 bg-white text-green-700 hover:bg-green-100"
                >
                  Gửi tin nhắn khác
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form
              action={formAction}
              onSubmit={() => setDismissSuccess(false)}
              className="space-y-4"
            >
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                    {state.errors?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      required
                    />
                    {state.errors?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tiêu đề</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Chủ đề bạn muốn trao đổi"
                      required
                    />
                    {state.errors?.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {state.errors.subject[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Viết nội dung tin nhắn..."
                      required
                      rows={5}
                    />
                    {state.errors?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {state.errors.message[0]}
                      </p>
                    )}
                  </div>
                  {/* Yêu cầu 3: Dùng component submit tái sử dụng với useFormStatus. */}
                  <SubmitButton
                    idleText="Gửi tin nhắn"
                    pendingText="Đang gửi..."
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

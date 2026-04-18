"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 text-3xl font-bold">
        !
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Hệ thống gặp sự cố!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {error.message ||
          "Đã xảy ra lỗi không xác định trong quá trình xử lý. Vui lòng thử lại."}
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
      >
        Tải lại trang
      </button>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] py-24 px-4 text-center">
      {/* Animation minh họa: Icon nảy lên xuống */}
      <div className="animate-bounce mb-8">
        <svg
          className="w-32 h-32 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-8xl font-extrabold text-gray-200 tracking-widest mb-2">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Lạc đường rồi bạn ơi!
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Trang bạn đang tìm kiếm dường như không tồn tại hoặc đã bị gỡ bỏ khỏi
        Portfolio của mình.
      </p>

      <Link
        href="/"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium"
      >
        Về Trang Chủ An Toàn
      </Link>
    </div>
  );
}

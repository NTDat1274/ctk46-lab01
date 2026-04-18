import Link from "next/link";
import Counter from "@/components/counter";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        {/* Đổi tone màu sang emerald */}
        <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center font-bold text-xl shadow-lg hover:scale-105 transition-transform">
          Dev IT
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Xin chào! Tôi là {/* Ứng dụng màu chữ Gradient */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            Nguyễn Tiến Đạt
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Chuyên ngành Công nghệ Thông tin tại Đại học Đà Lạt. Định hướng phát
          triển Full-stack & Machine Learning.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/projects"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-600/90 transition-colors shadow-md"
          >
            Xem dự án
          </Link>
          <Link
            href="/contact"
            className="backdrop-blur-sm bg-white/30 border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Liên hệ
          </Link>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center border-t dark:border-gray-800 pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Thử nghiệm Client Component (Counter)
        </h2>
        <Counter />
      </div>
    </div>
  );
}

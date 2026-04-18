"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Tên - Link về trang chủ */}
          <Link
            href="/"
            className="text-xl font-bold text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity"
          >
            Nguyễn Tiến Đạt
          </Link>

          {/* CỤM NÚT MOBILE: Nút Dark Mode + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>

          {/* Danh sách các liên kết điều hướng & Nút Dark Mode Desktop */}
          <div
            className={`flex-col md:flex-row items-center gap-6 md:flex ${
              isOpen ? "flex mt-4" : "hidden"
            }`}
          >
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Giới thiệu
            </Link>
            <Link
              href="/skills"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Kỹ năng
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dự án
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Liên hệ
            </Link>

            {/* CỤM NÚT DESKTOP: Có đường kẻ dọc phân cách */}
            <div className="hidden md:block border-l border-gray-300 dark:border-gray-700 pl-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        <p>© 2026 - Nguyễn Tiến Đạt | CTK46 - Các công nghệ mới trong PTPM</p>
        {/* Đã thêm link Github và Email theo yêu cầu BT */}
        <div className="mt-2 flex justify-center gap-4">
          <a
            href="https://github.com/NTDat1274"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
          <a
            href="mailto:nguyentiendat7233@gmail.com"
            className="hover:text-blue-600"
          >
            nguyentiendat7233@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

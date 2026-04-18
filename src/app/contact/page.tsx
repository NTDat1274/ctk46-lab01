export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Liên hệ</h1>
      <div className="bg-gray-50 border rounded-lg p-6 space-y-4 text-gray-700">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:nguyentiendat7233@gmail.com"
            className="text-blue-600 hover:underline"
          >
            nguyentiendat7233@gmail.com
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/NTDat1274"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/NTDat1274
          </a>
        </p>
        <p>
          <strong>Địa chỉ hiện tại:</strong> Phường 9, TP. Đà Lạt
        </p>
      </div>
    </div>
  );
}

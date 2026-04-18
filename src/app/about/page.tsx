export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Giới thiệu bản thân</h1>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          Xin chào! Mình là <strong>Nguyễn Tiến Đạt</strong>, sinh viên năm cuối
          ngành Công nghệ Thông tin tại Đại học Đà Lạt.
        </p>
        <p>
          Mục tiêu ngắn hạn của mình là hoàn thành xuất sắc đồ án tốt nghiệp.
          Sau khi ra trường, mình dự định sẽ Nam tiến, tìm phòng trọ tại Sài Gòn
          để bắt đầu hành trình sự nghiệp với vị trí Full-stack Developer hoặc
          Kỹ sư Machine Learning.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Học vấn & Định hướng
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900/60 rounded-lg p-4 border dark:border-gray-700">
          <p className="font-medium text-lg">Đại học Đà Lạt (2022 - 2026)</p>
          <p className="text-gray-600 dark:text-gray-400">
            Kỹ sư Công nghệ Thông tin
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              Nghiên cứu Full-stack: React, Angular, Node.js, Express, Firebase.
            </li>
            <li>
              Nghiên cứu AI/Data: Machine Learning, YOLO object detection,
              K-Means.
            </li>
            <li>Quy trình & Triển khai: Quản lý Git/GitHub, Docker.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full border border-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Hồ Sơ Sinh Viên
        </h1>

        {/* Thông tin cơ bản */}
        <div className="space-y-3 mb-6 border-b pb-6">
          <p className="text-xl text-gray-700">
            Họ và tên:{" "}
            <strong className="text-gray-900">Nguyễn Tiến Đạt</strong>
          </p>
          <p className="text-xl text-gray-700">
            MSSV: <strong className="text-gray-900">2212353</strong>
          </p>
          <p className="text-xl text-gray-700">
            Lớp: <strong className="text-gray-900">CTK46</strong>
          </p>
        </div>

        {/* Giới thiệu ngắn */}
        <div className="mb-6 border-b pb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Giới thiệu bản thân
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Xin chào! Mình là sinh viên năm cuối ngành IT, có niềm đam mê đặc
            biệt với lập trình web và đang định hướng phát triển chuyên sâu ở vị
            trí Full-stack Developer.
          </p>
        </div>

        {/* Nội dung bổ sung: Mục tiêu học tập */}
        <div className="bg-blue-50 rounded-lg p-5">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">
            Mục tiêu sắp tới
          </h2>
          <ul className="list-disc list-inside text-blue-900 space-y-2">
            <li>Hoàn thành xuất sắc đồ án tốt nghiệp với các công nghệ mới.</li>
            <li>Đạt chứng chỉ IELTS 5.5 để đáp ứng yêu cầu công việc.</li>
            <li>
              Chuẩn bị kiến thức vững vàng để chuyển vào Sài Gòn làm việc sau
              khi ra trường.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

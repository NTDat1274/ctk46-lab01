export default function ProjectsPage() {
  const projects = [
    {
      title: "Smart Đà Lạt Travel Itinerary",
      description:
        "Ứng dụng di động đề xuất lịch trình du lịch thông minh tại Đà Lạt, cá nhân hóa theo sở thích của người dùng.",
      tech: ["Ionic", "Node.js", "Firebase Firestore"],
    },
    {
      title: "Website Quản lý Tài nguyên Học tập",
      description:
        "Hệ thống quản lý tài liệu giáo dục, tích hợp lập kế hoạch sprint và tính toán chi phí (ROI/NPV).",
      tech: ["React", "Express", "PostgreSQL"],
    },
    {
      title: "Hệ thống Nhận diện Vật thể YOLO",
      description:
        "Ứng dụng Machine Learning sử dụng thuật toán YOLO để nhận diện và theo dõi đồ vật theo thời gian thực.",
      tech: ["Python", "Machine Learning", "YOLO"],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Dự án đã thực hiện</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {project.title}
            </h2>
            <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

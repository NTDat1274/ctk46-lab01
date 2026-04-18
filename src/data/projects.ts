export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  content: string;
}

export const projects: Project[] = [
  {
    id: "smart-dalat-travel",
    title: "Smart Đà Lạt Travel Itinerary",
    description:
      "Ứng dụng di động đề xuất lịch trình du lịch thông minh tại Đà Lạt.",
    tech: ["Ionic", "Node.js", "Firebase Firestore"],
    content:
      "Dự án tập trung vào việc xây dựng hệ thống cơ sở dữ liệu trên Firestore để lưu trữ thông tin địa điểm. Thuật toán sẽ dựa trên sở thích nhập vào của người dùng để tính toán và sắp xếp một lịch trình di chuyển tối ưu nhất tại Đà Lạt, giúp tiết kiệm thời gian và chi phí.",
  },
  {
    id: "learning-resource-management",
    title: "Website Quản lý Tài nguyên Học tập",
    description:
      "Hệ thống quản trị tài liệu và lộ trình học tập, tích hợp công cụ lập kế hoạch và quản lý tài chính dự án.",
    tech: ["React", "Express", "PostgreSQL", "Project Management"],
    content: `Dự án này tập trung vào việc tối ưu hóa cách quản lý tài liệu học tập và theo dõi tiến độ dự án phần mềm. 
  
    Các tính năng cốt lõi đã thực hiện:
    - Quản lý Sprint: Lập kế hoạch chi tiết cho từng giai đoạn phát triển (Sprint Planning), phân bổ công việc và theo dõi tiến độ qua biểu đồ Burndown.
    - Phân tích Tài chính Dự án: Tích hợp công cụ tính toán các chỉ số kinh tế quan trọng như NPV (Giá trị hiện tại thuần) và ROI (Tỷ suất hoàn vốn) để đánh giá tính khả thi và hiệu quả của việc đầu tư tài nguyên.
    - Phân quyền người dùng: Hệ thống cho phép quản trị viên, giảng viên và sinh viên tương tác với các mức độ truy cập tài nguyên khác nhau.`,
  },
  {
    id: "yolo-object-detection",
    title: "Hệ thống Nhận diện Vật thể YOLO",
    description:
      "Ứng dụng Machine Learning sử dụng thuật toán YOLO để nhận diện đồ vật.",
    tech: ["Python", "Machine Learning", "YOLO"],
    content:
      "Đồ án ứng dụng mô hình YOLO để nhận diện các vật thể trong thời gian thực (real-time) thông qua camera. Hệ thống không chỉ nhận diện mà còn tính toán để ước lượng khoảng cách từ camera đến vật thể, hỗ trợ cảnh báo cho người khiếm thị.",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
}

export const posts: Post[] = [
  {
    slug: "gioi-thieu-nextjs",
    title: "Giới thiệu Next.JS — Framework React phổ biến nhất",
    excerpt:
      "Tìm hiểu tại sao Next.JS là lựa chọn hàng đầu cho phát triển web hiện đại.",
    content: `Next.JS là một React framework mạnh mẽ được phát triển bởi Vercel.
    Nó cung cấp nhiều tính năng quan trọng như Server-Side Rendering (SSR),
    Static Site Generation (SSG), và App Router.
    Một số ưu điểm nổi bật của Next.JS:
    - Routing tự động dựa trên cấu trúc thư mục
    - Hỗ trợ Server Components và Client Components
    - Tối ưu hóa hình ảnh, font, và scripts tự động
    - API Routes tích hợp
    - Hỗ trợ TypeScript sẵn có`,
    date: "2025-01-15",
    category: "Công nghệ",
    author: "Nguyễn Tiến Đạt",
  },
  {
    slug: "hoc-tailwind-css",
    title: "Tailwind CSS — Cách tiếp cận mới cho CSS",
    excerpt:
      "Khám phá phương pháp utility-first CSS và tại sao nó thay đổi cách viết CSS.",
    content: `Tailwind CSS là một utility-first CSS framework, nghĩa là thay vì viết
    CSS tùy chỉnh, bạn sử dụng các class tiện ích có sẵn để xây dựng giao diện.
    Ví dụ, thay vì viết:
    .card { padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px
    rgba(0,0,0,0.1); }
    Bạn viết trực tiếp trong HTML:
    <div class="p-4 rounded-lg shadow-md">...</div>
    Ưu điểm:
    - Không cần đặt tên class
    - Không cần chuyển qua lại giữa file HTML và CSS
    - File CSS cuối cùng rất nhỏ (chỉ chứa class đã dùng)`,
    date: "2025-01-20",
    category: "Công nghệ",
    author: "Nguyễn Tiến Đạt",
  },
  {
    slug: "kinh-nghiem-hoc-lap-trinh",
    title: "Chia sẻ kinh nghiệm tự học lập trình hiệu quả",
    excerpt: "Những bài học rút ra sau 3 năm tự học lập trình ở đại học.",
    content: `Sau 3 năm học tập và thực hành lập trình, tôi rút ra một số kinh
     nghiệm quan trọng:
    1. Thực hành nhiều hơn đọc lý thuyết
    Lập trình là kỹ năng thực hành. Đọc sách và xem video chỉ chiếm 30%,
    70% còn lại là viết code.
    2. Xây dựng dự án thực tế
    Không gì tốt hơn việc xây dựng một sản phẩm thực tế để học.
    Hãy bắt đầu từ những dự án nhỏ và tăng dần độ phức tạp.
    3. Tham gia cộng đồng
    Tham gia các cộng đồng lập trình để học hỏi và chia sẻ kinh nghiệm.`,
    date: "2025-02-01",
    category: "Học tập",
    author: "Nguyễn Tiến Đạt",
  },
  {
    slug: "ung-dung-yolo-nhan-dien-vat-the",
    title: "Tích hợp YOLO Object Detection vào đồ án",
    excerpt: "Khái niệm cơ bản và cách triển khai YOLO bằng Python.",
    content:
      "YOLO (You Only Look Once) là một thuật toán Machine Learning cực kỳ mạnh mẽ để nhận diện vật thể theo thời gian thực (real-time). Trong đồ án của mình, YOLO giúp nhận diện các chướng ngại vật và ước lượng khoảng cách, qua đó hỗ trợ người dùng nhận biết môi trường xung quanh nhanh chóng và chính xác.",
    date: "2026-03-15",
    category: "Machine Learning",
    author: "Nguyễn Tiến Đạt",
  },
  {
    slug: "chuan-bi-nam-tien-tim-viec",
    title: "Kế hoạch 'Nam tiến' sau khi tốt nghiệp ĐH Đà Lạt",
    excerpt: "Những điều sinh viên IT cần chuẩn bị khi xuống Sài Gòn.",
    content:
      "Ngoài việc chuẩn bị kiến thức chuyên môn vững vàng về Full-stack (NodeJS, Firebase, Angular...), việc tìm hiểu kỹ thị trường phòng trọ ở các quận trung tâm Sài Gòn và chuẩn bị tài chính cũng rất quan trọng. Sinh viên chưa từng đi làm thêm như mình sẽ cần nỗ lực gấp đôi trong giai đoạn thực tập sắp tới.",
    date: "2026-04-02",
    category: "Cuộc sống",
    author: "Nguyễn Tiến Đạt",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

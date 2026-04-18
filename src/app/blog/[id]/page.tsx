// src/app/blog/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User, Comment } from "@/types/post";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPostData(id: string) {
  // 1. Lấy thông tin bài viết trước (vì cần userId để lấy thông tin tác giả)
  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  if (!postRes.ok) return null;
  const post: Post = await postRes.json();

  // 2. Bài tập tự làm: Chạy 2 request get User và get Comments song song bằng Promise.all()
  const [authorRes, commentsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
  ]);

  if (!authorRes.ok || !commentsRes.ok) {
    throw new Error("Không thể tải dữ liệu liên quan");
  }

  const author: User = await authorRes.json();
  const comments: Comment[] = await commentsRes.json();

  return { post, author, comments };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const data = await getPostData(id);

  if (!data) {
    notFound(); // Chuyển hướng sang giao diện not-found.tsx
  }

  const { post, author, comments } = data;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>
        <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
          <span>
            Tác giả: <strong className="text-gray-700">{author.name}</strong>
          </span>
          <span>•</span>
          <span>{author.email}</span>
        </div>

        <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-8 leading-relaxed">
          {post.body}
        </div>

        <div className="border-t pt-6 mb-8">
          <h3 className="font-semibold mb-2">Về tác giả</h3>
          <p className="text-gray-600 text-sm">
            <strong>{author.name}</strong> (@{author.username}) -{" "}
            {author.company.name}
          </p>
          <p className="text-gray-500 text-sm">{author.company.catchPhrase}</p>
        </div>

        {/* Bài tập tự làm: Hiển thị danh sách comments */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">
            Bình luận ({comments.length})
          </h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-sm text-gray-800">
                  {comment.name}
                </p>
                <p className="text-xs text-gray-500 mb-2">{comment.email}</p>
                <p className="text-sm text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

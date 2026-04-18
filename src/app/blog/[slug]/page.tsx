import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/data/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block font-medium"
      >
        ← Quay lại danh sách Blog
      </Link>
      <article className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">
            {post.category}
          </span>
          <span className="text-sm text-gray-400">{post.date}</span>
          <span className="text-sm text-gray-600 font-medium ml-auto">
            Tác giả: {post.author}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">{post.title}</h1>
        <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}

// Pre-render các trang tĩnh để tối ưu tốc độ
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

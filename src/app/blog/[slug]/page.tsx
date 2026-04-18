import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/data/posts";
import LikeButton from "@/components/like-button";

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
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm mb-6 inline-block font-medium"
      >
        ← Quay lại danh sách Blog
      </Link>
      <article className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded font-medium">
            {post.category}
          </span>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {post.date}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium ml-auto">
            Tác giả: {post.author}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <div className="prose max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>

        <div className="border-t pt-6">
          <LikeButton />
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

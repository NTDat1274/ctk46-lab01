import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
                {post.category}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {post.date}
              </span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            {/* Hiển thị tác giả (author) */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
              Bởi: {post.author}
            </p>
            <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline font-medium"
            >
              Đọc thêm →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

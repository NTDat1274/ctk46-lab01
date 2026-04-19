// src/app/blog/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User, Comment } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      <Button asChild variant="link" className="mb-6 px-0">
        <Link href="/blog">← Quay lại danh sách</Link>
      </Button>

      <article className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl capitalize">{post.title}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Tác giả: {author.name}</Badge>
              <Badge variant="secondary">{author.email}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none whitespace-pre-line leading-relaxed text-foreground">
              {post.body}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Về tác giả</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">{author.name}</strong> (@
              {author.username}) - {author.company.name}
            </p>
            <p>{author.company.catchPhrase}</p>
          </CardContent>
        </Card>

        {/* Bài tập tự làm: Hiển thị danh sách comments */}
        <Card>
          <CardHeader>
            <CardTitle>Bình luận ({comments.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {comments.map((comment, index) => (
              <div key={comment.id} className="space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  {comment.name}
                </p>
                <p className="text-xs text-muted-foreground">{comment.email}</p>
                <p className="text-sm text-muted-foreground">{comment.body}</p>
                {index < comments.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </article>
    </div>
  );
}

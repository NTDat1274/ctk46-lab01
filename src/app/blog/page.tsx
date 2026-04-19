import Link from "next/link";
import { Post } from "@/types/post";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài viết");
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <div className="mb-6">
        <Badge variant="secondary">
          Tổng cộng {posts.length} bài viết từ API
        </Badge>
      </div>

      <div className="space-y-6">
        {posts.slice(0, 10).map((post) => (
          <article key={post.id}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline">Tác giả #{post.userId}</Badge>
                  <Badge variant="secondary">Bài #{post.id}</Badge>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <CardTitle className="capitalize hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {post.body}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/blog/${post.id}`}>Đọc thêm →</Link>
                </Button>
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
    </div>
  );
}

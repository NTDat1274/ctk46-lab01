import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button asChild variant="link" className="mb-6 px-0">
        <Link href="/projects">← Quay lại danh sách Dự án</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <Separator className="mb-6" />
          <div className="prose max-w-none text-lg leading-relaxed text-foreground whitespace-pre-line">
            {project.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

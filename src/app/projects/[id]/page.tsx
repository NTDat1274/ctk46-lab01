import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";

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
      <Link
        href="/projects"
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách Dự án
      </Link>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border dark:border-gray-700 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="flex gap-2 mb-6 border-b dark:border-gray-700 pb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-md border dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="prose max-w-none text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
          {project.content}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

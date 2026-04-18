import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Dự án đã thực hiện</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-900 flex flex-col"
          >
            <Link href={`/projects/${project.id}`}>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400 hover:underline">
                {project.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

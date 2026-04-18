export default function LoadingPostDetail() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-6"></div>
      <article className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex gap-3 mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse ml-auto"></div>
        </div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </article>
    </div>
  );
}

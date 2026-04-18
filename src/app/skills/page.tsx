export default function SkillsPage() {
  const skills = [
    "NodeJS & Express",
    "Firebase & Firestore",
    "Ionic & Angular",
    "Python & Machine Learning",
    "YOLO Object Detection",
    "Git & Docker",
    "Postman API Testing",
    "Next.js & Tailwind CSS",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Kỹ năng Lập trình</h1>
      <ul className="grid grid-cols-2 gap-4 list-disc list-inside text-gray-700 dark:text-gray-300">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-lg border dark:border-gray-700"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

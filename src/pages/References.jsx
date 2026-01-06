import { useSearchParams } from "react-router-dom";

const references = [
  { id: 1, title: "Student Copyright Checklist", src: "/forms/copyrightchecklist.pdf" },
  { id: 2, title: "Media Citations", src: "/forms/workscited.pdf" },
  { id: 3, title: "Work Log", src: "/forms/worklog.pdf" },
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="bg-gradient-to-br bg-sky-900/95 text-white py-20 px-4 text-center pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          References
        </h1>
      </div>

      {/* PDF Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 md:px-16">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <h2 className="text-lg font-semibold p-4 border-b border-gray-100">
              {ref.title}
            </h2>
            <div className="h-[400px] md:h-[80vh] w-full">
              <iframe
                src={ref.src}
                className="w-full h-full"
                title={ref.title}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

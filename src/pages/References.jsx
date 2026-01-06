import React from "react";


const references = [
  { id: 1, title: "Student Copyright Checklist", src: "/forms/copyrightchecklist.pdf" },
  { id: 2, title: "Media Citations", src: "/forms/workscited.pdf" },
  { id: 3, title: "Work Log", src: "/pdfs/reference3.pdf" },
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-16">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          References
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          All our key references and documentation are embedded below for easy access.
        </p>
      </div>

      {/* PDF Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <h2 className="text-lg font-semibold p-4 border-b border-gray-100">
              {ref.title}
            </h2>
            <div className="h-[400px] md:h-[500px] w-full">
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

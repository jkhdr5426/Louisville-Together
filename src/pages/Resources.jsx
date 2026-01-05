import { useState } from "react";
import {
  HeartIcon,
  CakeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserGroupIcon,
  HomeIcon,
  BoltIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  FunnelIcon
} from "@heroicons/react/24/solid";
import ResourceModal from "../components/ResourceModal";
import SearchBar from "../components/SearchBar";
import ResourceCard from "../components/ResourceCard";

import { mockResources } from "../data/resources.mock";

// Map category names to top colors (matching your JSON)
const categoryColors = {
  Healthcare: "bg-blue-600",
  "Food Assistance": "bg-green-600",
  Employment: "bg-orange-500",
  Education: "bg-purple-600",
  "Family Services": "bg-pink-500",
  Housing: "bg-indigo-600",
  Utilities: "bg-cyan-500",
  "Legal Aid": "bg-red-600",
  "Crisis Support": "bg-orange-700",
  "Financial Help": "bg-green-700"
};

// Categories array with icons, names exactly matching JSON
export const categories = [
  { name: "All Resources", icon: BuildingOfficeIcon },
  { name: "Healthcare", icon: HeartIcon },
  { name: "Food Assistance", icon: CakeIcon },
  { name: "Employment", icon: BriefcaseIcon },
  { name: "Education", icon: BookOpenIcon },
  { name: "Family Services", icon: UserGroupIcon },
  { name: "Housing", icon: HomeIcon },
  { name: "Utilities", icon: BoltIcon },
  { name: "Legal Aid", icon: ScaleIcon },
  { name: "Crisis Support", icon: ExclamationTriangleIcon },
  { name: "Financial Help", icon: CurrencyDollarIcon }
];

export default function Resources() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredResources =
    selectedCategory === "All Resources"
      ? mockResources
      : mockResources.filter(
          (res) => res.category === selectedCategory
        );

  return (
    <>
      {/* Para-Hero */}
      <section className="bg-sky-900/95 text-white pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community Resources
          </h1>

          <p className="text-lg md:text-xl text-sky-100 max-w-2xl mb-10">
            Find detailed information about Louisville&apos;s community resources
            and services.
          </p>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={() => console.log("Search:", query)}
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filter label */}
          <div className="flex items-center gap-2 mb-4 text-sky-900 font-semibold">
            <FunnelIcon className="w-5 h-5" />
            <span>Filter by Category</span>
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              const selectedColor =
                cat.name === "All Resources"
                  ? "bg-sky-600"
                  : categoryColors[cat.name];

              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium transition ${
                    isSelected
                      ? `${selectedColor} text-white hover:brightness-90`
                      : "bg-sky-200 text-sky-900 hover:bg-sky-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Summary */}
          <p className="mt-2 text-gray-600">
            Showing {filteredResources.length} resources in{" "}
            <span className="font-semibold">{selectedCategory}</span>
          </p>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onView={() => {
                setSelectedResource(res);
                setModalOpen(true);
              }}
            />
          ))}

          {filteredResources.length === 0 && (
            <p className="text-center col-span-full text-gray-600">
              No resources found.
            </p>
          )}
        </div>

        <ResourceModal
          resource={selectedResource}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </section>
    </>
  );
}

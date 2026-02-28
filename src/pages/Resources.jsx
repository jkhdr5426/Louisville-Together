import { useState, useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import ResourceModal from "../components/ResourceModal";
import SearchBar from "../components/SearchBar";
import ResourceCard from "../components/ResourceCard";
import resources from "../data/resources.json";
import { CATEGORY_CONFIG, ALL_CATEGORY } from "../utils/categoryConfig";
import { useLocation } from "react-router-dom";


function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function Resources() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedResource, setSelectedResource] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [fadeNotification, setFadeNotification] = useState(false);
  const [highlightSearch, setHighlightSearch] = useState(false);
  const [fadeHighlight, setFadeHighlight] = useState(false);

  const queryParams = useQueryParams();

  const CATEGORY_MAP = {
    all: "all",
    "Healthcare": "healthcare",
    "Food Assistance": "food",
    "Food": "food",
    "Jobs": "employment",
    "Employment": "employment",
    "Education": "education",
    "Family": "family_services",
    "Family Services": "family_services",
    "Housing": "housing",
    "Utilities": "utilities",
    "Legal Aid": "legal_aid",
    "Crisis Support" : "crisis_support",
    "Financial Help" : "financial_help",
    "Parks" : "park",
    "Arts and Culture": "artsculture",
    "Entertainment" : "entertainment"
  };


  const handleCategoryClick = (catKey) => {
    setSelectedCategory(catKey);

    if (catKey !== "all" && query.trim() === "" && selectedCategory === "all") {
      setHighlightSearch(true);
      setShowNotification(true);
      setFadeNotification(false);
      setFadeHighlight(false);

      setTimeout(() => setFadeNotification(true), 5000);
      setTimeout(() => setFadeHighlight(true), 5000);
    }
  };
  useEffect(() => {
    const urlQuery = queryParams.get("query") || "";
    const urlCategory = queryParams.get("category") || "all";
    setQuery(urlQuery);
    const mappedCategory = CATEGORY_MAP[urlCategory] || "all";
    setSelectedCategory(mappedCategory);
  }, [location.search]); // run once on mount


  // auto fade everything when user types
  useEffect(() => {
    if (query.trim() !== "") {
      setFadeHighlight(true);
      setFadeNotification(true);

      const timeout = setTimeout(() => {
        setHighlightSearch(false);
        setFadeHighlight(false);
        setShowNotification(false);
        setFadeNotification(false);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [query]);

  // const filteredResources = resources
  // .map((res) => {
  //   const similarity = query.trim()
  //     ? computeSimilarity(query, res) // your AI similarity function
  //     : 1; // if no query, consider all fully matching
  //   return { ...res, similarity };
  // })
  // .filter((res) => res.similarity > 0.7)
  // .sort((a, b) => b.similarity - a.similarity); // optional: sort by descending similarity


  const filteredResources = resources.filter((res) => {
    const matchesCategory =
      selectedCategory === "all" || res.category === selectedCategory;

    const matchesQuery =
      !query ||
      res.name.toLowerCase().includes(query.toLowerCase()) ||
      res.description?.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <section className="bg-sky-900/95 text-white pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Resources Hub
          </h1>

          <p className="text-lg text-sky-100 mb-10">
            Find detailed information about Louisville&apos;s community
            resources.
          </p>

          <div className="w-full max-w-md mx-auto relative">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={() => {}}
              highlight={highlightSearch && !fadeHighlight}
              showButton={false}
            />

            {showNotification && (
              <div
                className={`mt-4 p-3 rounded-md bg-blue-500 text-white font-medium text-center
                  transition-all duration-700 ease-in-out
                  ${fadeNotification ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              >
                Please enter a search term before selecting a specific category.
                Doing so will make your search more effective.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4 font-semibold">
            <FunnelIcon className="w-5 h-5" />
            Filter by Category
          </div>

          <div className="flex flex-wrap gap-2">
            {[ALL_CATEGORY, ...Object.entries(CATEGORY_CONFIG).map(([key, v]) => ({
              key,
              ...v,
            }))].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full
                    font-medium transition ${
                      isSelected
                        ? `${cat.color || "bg-sky-600"} text-white`
                        : "bg-sky-200 text-sky-900 hover:bg-sky-300"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-gray-600 text-left">
            Showing {filteredResources.length} resources in{" "}
            <span className="font-semibold">{selectedCategory === "all" ? "All Resources" : CATEGORY_CONFIG[selectedCategory]?.label}</span>
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.length > 0 ? (
            filteredResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                onView={() => setSelectedResource(res)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-20">
              No resources match your search or filter.
            </div>
          )}
        </div>

        <ResourceModal
          resource={selectedResource}
          open={Boolean(selectedResource)}
          onClose={() => setSelectedResource(null)}
        />
      </section>

    </>
  );
}

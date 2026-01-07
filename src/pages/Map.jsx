import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";


const categoryColors = {
  healthcare: "#3b82f6",
  food: "#22c55e",
  employment: "#f59e0b",
  education: "#a855f7",
  family_services: "#ec4899",
  housing: "#6366f1",
  utilities: "#06b6d4",
  legal_aid: "#ef4444",
  crisis_support: "#f97316",
  financial_help: "#10b981",
};

const categories = [
  { id: "all", label: "All" },
  { id: "healthcare", label: "Healthcare" },
  { id: "food", label: "Food" },
  { id: "employment", label: "Jobs" },
  { id: "education", label: "Education" },
  { id: "family_services", label: "Family Services" },
  { id: "housing", label: "Housing" },
  { id: "utilities", label: "Utilities" },
  { id: "legal_aid", label: "Legal Aid" },
  { id: "crisis_support", label: "Crisis Support" },
  { id: "financial_help", label: "Financial Help" },
];

// Dummy resources, replace with your API or JSON import
import resources from "../data/resources.json";

export default function MapPage() {
  const mapRef = useRef(null);
  const sidebarRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedResource, setSelectedResource] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resourceNameParam = queryParams.get("resourceName");

  // safe map init
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    leafletMap.current = L.map(mapRef.current, {
      center: [38.2527, -85.7585],
      zoom: 12,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(leafletMap.current);
  }, []);

  useEffect(() => {
    if (!resourceNameParam) return;

    const matchingResource = resources.find(
      (r) => r.name === resourceNameParam
    );

    if (matchingResource && leafletMap.current) {
      setSelectedResource(matchingResource);
      leafletMap.current.setView(
        [matchingResource.latitude, matchingResource.longitude],
        14
      );
    }
  }, [resourceNameParam, resources]);

  useEffect(() => {
    if (!leafletMap.current) return;

    //delete old markers
    markersRef.current.forEach((m) => leafletMap.current.removeLayer(m));
    markersRef.current = [];

    const filtered = resources.filter(
      (r) =>
        r.latitude &&
        r.longitude &&
        (selectedCategory === "all" || r.category === selectedCategory)
    );

    filtered.forEach((res) => {
      const isSelected = selectedResource?.id === res.id;

      const marker = L.marker([res.latitude, res.longitude], {
        icon: L.divIcon({
          className: "", // leave blank, styles in inner div
          html: `<div class="marker ${
            isSelected ? "pulsing-marker" : ""
          }" style="background-color:${categoryColors[res.category] || "#374151"}"></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        }),
      }).addTo(leafletMap.current);

      marker.on("click", () => {
        setSelectedResource(res);
        leafletMap.current.setView([res.latitude, res.longitude], 14);
        
        if (window.innerWidth < 768 && sidebarRef.current) {
          sidebarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      markersRef.current.push(marker);
    });

  }, [selectedCategory, selectedResource]);

  return (
    <>
      <div className="bg-gradient-to-br bg-sky-900/95 text-white py-20 px-4 text-center pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Resource Map
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-blue-100">
          Explore Louisville's community resources on an interactive map. Click on markers to view details and get directions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row px-4 pb-20 pt-16">
        <div className="lg:flex-1 h-[60vh] lg:h-[70vh] z-49 border-4  border-slate-300" ref={mapRef}></div>

        <div className="lg:w-96 bg-white p-4 lg:overflow-y-auto max-h-[calc(100vh-4rem)]"
          ref={sidebarRef}
        >
          <div className="mb-4">
            <h2 className="font-semibold mb-2 text-[#1E3A5F]">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const count = resources.filter(
                  (r) =>
                    r.latitude &&
                    r.longitude &&
                    (cat.id === "all" || r.category === cat.id)
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-2xl font-semibold border-2 flex items-center gap-2 transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? "bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md"
                        : "bg-white text-[#1E3A5F] border-[#1E3A5F] hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && count > 0 && (
                      <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

         {selectedResource ? (
            <div
              className="
                mt-4
                p-4
                border
                rounded-lg
                shadow-lg
                bg-white
                space-y-4
                max-h-[60vh]
                overflow-y-auto
                lg:max-h-none
              "
            >
              <div>
                <h3 className="font-bold text-2xl text-[#1E3A5F] mb-2">
                  {selectedResource.name}
                </h3>
                <p className="text-gray-600 mb-2">{selectedResource.description}</p>
              </div>

              <div className="p-4 bg-slate-100 rounded-2xl shadow-md border border-gray-200 space-y-3">
                <h4 className="font-semibold text-lg text-[#1E3A5F] mb-2">Basic Information</h4>

                {selectedResource.address && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-400">📍</span>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm text-gray-700">
                        {selectedResource.address}<br />
                        {selectedResource.city}, {selectedResource.state} {selectedResource.zip_code}
                      </p>
                    </div>
                  </div>
                )}

                {selectedResource.phone && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-400">📞</span>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <a href={`tel:${selectedResource.phone}`} className="text-[#1E3A5F] font-semibold hover:underline text-sm">
                        {selectedResource.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-2">
                  {selectedResource.address && (
                    <button
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#4A90D9] hover:from-[#2B5280] hover:to-[#5BA0E9] text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            selectedResource.name + " " +
                            selectedResource.address + ", " +
                            selectedResource.city + ", " +
                            selectedResource.state + " " +
                            selectedResource.zip_code
                          )}`,
                          "_blank"
                        )
                      }
                    >
                    Get Directions
                    </button>
                  )}
                  <button
                    className="flex-1 px-3 py-2 border rounded-lg text-[#1E3A5F] font-semibold hover:bg-gray-100"
                    onClick={() => setSelectedResource(null)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white rounded-2xl shadow-lg text-center">
              <p className="text-gray-500 mt-4">Click on a marker to see resource details</p>
            </div>
          )}



        </div>
      </div>
    </>
    
  );
}

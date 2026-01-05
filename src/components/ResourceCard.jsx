import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import categoryColors from "../utils/categoryColors.js";

export default function ResourceCard({ resource, onView }) {
  const color = categoryColors[resource.category] || "bg-gray-400";
  const visibleTags = resource.tags.slice(0, 3);
  const extraCount = resource.tags.length - visibleTags.length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col
                    hover:shadow-xl transition transform hover:-translate-y-1
                    animate-fadeIn">
      {/* Category label */}
      <span
        className={`inline-block ${color} text-white text-xs font-semibold
                    px-3 py-1 rounded-full mb-3 w-fit`}
      >
        {resource.category}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {resource.name}
      </h3>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        {resource.description}
      </p>

      {/* Info rows */}
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-gray-500" />
          {resource.phone}
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-500" />
          {resource.address}
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-gray-500" />
          {resource.hours}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full flex items-center"
          >
            {tag}
          </span>
        ))}

        {extraCount > 0 && (
          <span
            className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full flex items-center"
          >
            +{extraCount} more
          </span>
        )}
      </div>


      {/* CTA */}
      <button
        onClick={onView}
        className="mt-auto px-4 py-2 rounded-md font-medium text-white
                   bg-gradient-to-r from-sky-900/95 to-sky-500/75
                   hover:from-sky-800/95 hover:to-sky-400/75
                   transition transform hover:scale-[1.02]"
      >
        View Full Details
      </button>
    </div>
  );
}

import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { CATEGORY_CONFIG } from "../utils/categoryConfig";

export default function ResourceCard({ resource, onView }) {
  const category = CATEGORY_CONFIG[resource.category];

  const fullAddress = [
    resource.address,
    resource.city,
    resource.state,
    resource.zip_code,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col
                    hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Category label */}
      {category && (
        <span
          className={`inline-block ${category.color} text-white text-xs
                      font-semibold px-3 py-1 rounded-full mb-3 w-fit`}
        >
          {category.label}
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {resource.name}
      </h3>

      <p className="text-gray-700 mb-4 line-clamp-4">
        {resource.description}
      </p>

      <div className="space-y-2 text-sm text-gray-700 mb-4">
        {resource.phone && (
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-gray-500" />
            {resource.phone}
          </div>
        )}

        {fullAddress && (
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-500" />
            {fullAddress}
          </div>
        )}

        {resource.hours && (
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-gray-500" />
            {resource.hours}
          </div>
        )}
      </div>

      <button
        onClick={onView}
        className="mt-auto px-4 py-2 rounded-md font-medium text-white
                   bg-gradient-to-r from-sky-900/95 to-sky-500/75
                   hover:from-sky-800/95 hover:to-sky-400/75"
      >
        View Full Details
      </button>
    </div>
  );
}

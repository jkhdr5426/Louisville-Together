import categoriesData from "../data/resources.json";
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
} from "@heroicons/react/24/solid";

// Map icon string to actual imported component
const iconsMap = {
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
};

export default function Categories() {
  return (
    <section className="py-12 px-4 md:px-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
        Explore Community Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-[20vh]">
        {categoriesData.map((cat) => {
          const Icon = iconsMap[cat.icon];

          return (
            <div
              key={cat.name}
              className="rounded-lg overflow-hidden shadow flex flex-col"
            >
              {/* Top 25% with icon */}
              <div className={`${cat.colorTop} flex items-center justify-between p-4 h-1/4`}>
                <Icon className="w-8 h-8 text-white" />
                <div className="bg-white text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {cat.badge}
                </div>
              </div>

              {/* Bottom 75% with content */}
              <div className={`${cat.colorBottom} flex flex-col flex-grow p-6`}>
                <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                <p className="text-gray-800 mb-4">{cat.description}</p>
                <ul className="mb-4 space-y-1 text-gray-800">
                  {cat.resources.map((res) => (
                    <li key={res}>{res}</li>
                  ))}
                </ul>
                <button className="mt-auto text-blue-600 font-semibold hover:underline">
                  View all resources &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
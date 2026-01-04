import GradientButton from "./GradientButton";
import categoriesData from "../data/categories.json";
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
               className="rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
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
                <button className="text-left mt-auto text-gray-800 font-semibold hover:text-blue-800">
                  View all resources &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xl md:text-2xl font-medium mt-12 mb-6">
        Can't find what you're looking for?
      </p>
      <div className="flex justify-center mt-12 mb-16">
        <GradientButton onClick={() => console.log("Contact clicked!")}>
          Contact Us for Personalized Help
        </GradientButton>
      </div>
      
    </section>
  );
}
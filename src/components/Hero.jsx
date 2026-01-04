import {
  HeartIcon,
  CakeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserGroupIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function Hero() {
  const categories = [
    { name: "Healthcare", icon: HeartIcon, bg: "bg-blue-600", hover: "hover:bg-blue-700" },
    { name: "Food", icon: CakeIcon, bg: "bg-green-600", hover: "hover:bg-green-700" },
    { name: "Jobs", icon: BriefcaseIcon, bg: "bg-orange-600", hover: "hover:bg-orange-700" },
    { name: "Education", icon: BookOpenIcon, bg: "bg-purple-600", hover: "hover:bg-purple-700" },
    { name: "Family", icon: UserGroupIcon, bg: "bg-pink-600", hover: "hover:bg-pink-700" },
    { name: "Housing", icon: HomeIcon, bg: "bg-indigo-500", hover: "hover:bg-indigo-700" },
  ];

  return (
    <div className ="relative w-full">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/i_eqExBpECg?autoplay=1&mute=1&loop=1&playlist=i_eqExBpECg&controls=0&modestbranding=1&rel=0"
          title="Louisville Timelapse"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover pointer-events-none scale-[1.05]"
        ></iframe>
      </div>
      <section className="h-1300px bg-blue-600/35 text-white flex flex-col items-center justify-center px-4 md:px-16 py-24 md:py-40">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Louisville Community Resources
        </h1>

        <p className="text-lg md:text-2xl text-center mb-12 max-w-2xl">
          Find local services, support, and volunteer opportunities in your community.
        </p>

        <div className="w-full max-w-xl mb-10">
          <div className="flex rounded-lg overflow-hidden shadow bg-white">
            <div className="flex items-center px-3 bg-white">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for resources..."
              className="flex-grow px-4 py-3 text-black focus:outline-none"
            />
            <button
              className="m-1.5 px-4 py-2 rounded-md font-medium transition-colors
                bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white
                hover:from-blue-800/95 hover:to-blue-400/75"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl w-full py-4">
          {categories.map(({ name, icon: Icon, bg, hover }) => (
            <button
              key={name}
              className={`flex items-center gap-2 font-semibold px-5 py-3 rounded-lg shadow text-white ${bg} ${hover} flex-shrink-0`}
            >
              <Icon className="w-6 h-6" />
              {name}
            </button>
          ))}
        </div>
        <div className="absolute bottom-6 w-full flex justify-center">
          <div className="w-6 h-10 border-2 border-white/45 rounded-full flex items-center justify-center overflow-hidden animate-bounce"
            style={{ animation: 'bounce 1.5s infinite' }}
          >
            <div className="w-1 h-2 bg-white/25 rounded-full animate-bounce"></div>
          </div>
        </div>

      </section>
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-blue-800/60 via-transparent to-blue-950"></div>
    </div>
  );
}

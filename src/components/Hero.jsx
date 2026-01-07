import { useState } from "react";
import { useNavigate } from 'react-router-dom';


import {
  HeartIcon,
  CakeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  UserGroupIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import SearchBar from "./SearchBar";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
          className="w-full h-full object-cover pointer-events-none scale-[1] mt-3"
        ></iframe>
      </div>
      <section className="h-1300px bg-blue-600/35 text-white flex flex-col items-center justify-center px-4 md:px-16 py-24 md:py-40">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Louisville Community Resources
        </h1>

        <p className="text-lg md:text-2xl text-center mb-12 max-w-2xl">
          Find local services, support, and volunteer opportunities in your community.
        </p>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => {
            if (query.trim() !== "") {
              navigate(`/resources?query=${encodeURIComponent(query)}`);
              console.log("a");
            }
          }}
        />

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl w-full py-4">
          {categories.map(({ name, icon: Icon, bg, hover }) => (
            <button
              key={name}
              onClick={() => {
                navigate(`/resources?category=${encodeURIComponent(name)}`)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
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
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-sky-900/60 via-transparent to-sky-400/30"></div>
    </div>
  );
}

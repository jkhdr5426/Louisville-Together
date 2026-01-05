import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar({ value, onChange, onSearch, highlight = false, showButton = true, fade = false }) {
  return (
    <div className="w-full max-w-xl mb-10">
      <div
        className={`flex rounded-lg overflow-hidden shadow bg-white
          transition-all duration-700 ease-in-out
          ${highlight ? "rainbow-border border-4" : "border-0"}
          ${fade ? "opacity-0 scale-95 border-0" : "opacity-100 scale-100"}`}
      >
        <div className="flex items-center px-3 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for resources..."
          className="flex-grow px-4 py-3 text-black focus:outline-none"
        />

        {showButton && (
          <button
            type="button"               // important, prevents accidental form submit
            onClick={() => onSearch()}   // call the prop from Hero
            className="m-1.5 px-4 py-2 rounded-md font-medium
                      text-white bg-gradient-to-r from-sky-900/95 to-sky-500/75
                      hover:from-sky-800/95 hover:to-sky-400/75
                      transform transition hover:scale-105 hover:shadow-xl"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
}

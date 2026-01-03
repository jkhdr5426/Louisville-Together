import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">Louisville Together</Link>
        </div>
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/resources" className="hover:underline">
            Resources
          </Link>
          <Link to="/map" className="hover:underline">
            Map
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/references" className="hover:underline">
            References
          </Link>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {open && (<div className="md:hidden bg-blue-700 px-6 pb-4 space-y-3">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="block hover:underline"
        >
          Home
        </Link>

        <Link
          to="/resources"
          onClick={() => setOpen(false)}
          className="block hover:underline"
        >
          Resources
        </Link>

        <Link
          to="/map"
          onClick={() => setOpen(false)}
          className="block hover:underline"
        >
          Map
        </Link>

        <Link
          to="/about"
          onClick={() => setOpen(false)}
          className="block hover:underline"
        >
          About
        </Link>

        <Link
          to="/references"
          onClick={() => setOpen(false)}
          className="block hover:underline"
        >
          References
        </Link>
      </div>)}
    </nav>
  );
};

export default Navbar;

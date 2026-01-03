import { useState } from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-blue-950">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Louisville Together
          </NavLink>
        </div>
        <div className="space-x-6 hidden md:flex">
          <NavLink to="/"  className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"            // active page: solid blue
                : "text-blue-950 hover:bg-blue-50/85"      // default: white text, hover: semi-transparent white
            }`
          }>
            Home
          </NavLink>
          <NavLink to="/resources"  className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"        
                : "text-blue-950 hover:bg-blue-50/85"    
            }`
          }>
            Resources
          </NavLink>
          <NavLink to="/map"  className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"          
                : "text-blue-950 hover:bg-blue-50/85"    
            }`
          }>
            Map
          </NavLink>
          <NavLink to="/about"  className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"            
                : "text-blue-950 hover:bg-blue-50/85"     
            }`
          }>
            About
          </NavLink>
          <NavLink to="/references"  className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"           
                : "text-blue-950 hover:bg-blue-50/85"      
            }`
          }>
            References
          </NavLink>
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
      {open && (
          <div
            className={`p-4 md:hidden overflow-hidden transition-[max-height] duration-300 ${
              open ? "max-h-64" : "max-h-0"
            }`}
          >
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            `block px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"          
                : "text-blue-950 hover:bg-blue-50/85"      
            }`
          }
          >
            Home
          </NavLink>

          <NavLink
            to="/resources"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            `block px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"          
                : "text-blue-950 hover:bg-blue-50/85"      
            }`
          }
          >
            Resources
          </NavLink>

          <NavLink
            to="/map"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            `block px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"        
                : "text-blue-950 hover:bg-blue-50/85"     
            }`
          }
          >
            Map
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            `block px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"        
                : "text-blue-950 hover:bg-blue-50/85"     
            }`
          }
          >
            About
          </NavLink>

          <NavLink
            to="/references"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            `block px-4 py-2 rounded-md font-medium transition-colors
            ${
              isActive
                ? "bg-gradient-to-r from-blue-900/95 to-blue-500/75 text-white"            
                : "text-blue-950 hover:bg-blue-50/85"      
            }`
          }
          >
            References
          </NavLink>
        </div>
      )}
    </nav>
    <div
      className={`transition-[height] duration-300 md:hidden`}
      style={{ height: open ? "250px" : "64px" }}
    />
    </>
  );
};

export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';


import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";



function SocialIcon({ icon, label, link }) {
  return (
    <a
      href={link}
      // target="_blank"
      // rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-blue-300 flex items-center justify-center
                 hover:border-yellow-400 transition"
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-blue-200 hover:fill-yellow-400 transition"
      >
        <path d={icon.path} />
      </svg>
    </a>
  );
}


export default function Footer() {
  const linkClass =
    "flex items-center gap-2 text-blue-200 hover:text-yellow-400 transition";
  const navigate = useNavigate();


  return (
    <footer className="bg-sky-950 text-white px-6 md:px-20 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
        <div>
          <h3 className="text-xl font-bold mb-3">
            Louisville Together
          </h3>
          <p className="text-blue-200 mb-4">
            Connecting individuals and families to trusted local resources that
            support health, stability, and opportunity.
          </p>

          <div className="flex gap-4 mt-4">
            {/* TODO maybe more social stuff later */}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Services</h4>
          <ul className="space-y-2">
            {[
              "Healthcare",
              "Food Assistance",
              "Employment",
              "Education",
              "Family Services",
              "Housing",
              "Parks",
              "Arts and Culture",
              "Entertainment"
            ].map((item) => (
              <li
                key={item}
                onClick={() => {
                  navigate(`/resources?category=${encodeURIComponent(item)}`)
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${linkClass} cursor-pointer`}
              >

                <span className="text-blue-200 group-hover:text-yellow-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Information</h4>
          <ul className="space-y-2">
            {[
              "All Resources",
              "Resource Map",
              "About Us",
              "Suggest Resources"
            ].map((item) => (
              <li
                key={item}
                className={`${linkClass} cursor-pointer`}
                onClick={() => {
                  if (item === "All Resources") navigate('/resources');
                  if (item === "Resource Map") navigate("/map");
                  if (item === "About Us") navigate("/about");
                  if (item === "Suggest Resources") navigate("/suggest");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className="text-blue-200 group-hover:text-yellow-400">•</span>
                {item}
              </li>
            ))}

          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Featuring</h4>
          <ul className="space-y-2">
            {[
              "Louisville Urban League",
              "Norton Healthcare",
              "Dare to Care",
              "Family and Children's Place",
            ].map((item) => (
              <li
                key={item}
                onClick={() => {
                  navigate(`/resources?query=${encodeURIComponent(item)}`)
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${linkClass} cursor-pointer`}
              >
                <span className="text-blue-200 group-hover:text-yellow-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sky-200/20 my-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-blue-300 flex items-center justify-center">
            <MapPinIcon className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <p className="font-semibold">Visit Us</p>
            <p className="text-blue-200">Louisville, Kentucky</p>
            <p className="text-blue-200">Serving all neighborhoods</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-blue-300 flex items-center justify-center">
            <PhoneIcon className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <p className="font-semibold">Call Us</p>
            <p className="text-blue-200">Helpline: (502) 555-HELP</p>
            <p className="text-blue-200">Available 24/7</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-blue-300 flex items-center justify-center">
            <EnvelopeIcon className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <p className="font-semibold">Email Us</p>
            <a href="mailto:louisvilletogether@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-yellow-400">
              louisvilletogether@gmail.com
            </a>
            <p className="text-blue-200">Response within 24 hours</p>
          </div>
        </div>
      </div>

      <div className="border-t border-sky-200/20 my-6" />

      <div className="flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm pb-8 gap-4">
        <p>
          © 2025 Louisville Together. All rights reserved.
        </p>

        <div className="flex gap-6">
          <span className="hover:text-yellow-400 cursor-pointer transition">
            Team ID 22961-2
          </span>
          <span className="hover:text-yellow-400 cursor-pointer transition"
          onClick={()=>{
            navigate("/references")
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
            Reference Page
          </span>
          <span className="hover:text-yellow-400 cursor-pointer transition"
          onClick={()=>{
            navigate("/references?highlight=copyright-checklist");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          >
            Copyright Checklist
          </span>
          <span className="hover:text-yellow-400 cursor-pointer transition"
          onClick={()=>{
            navigate("/references?highlight=work-log");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          >
            Work Log
          </span>
        </div>
      </div>
    </footer>
  );
}

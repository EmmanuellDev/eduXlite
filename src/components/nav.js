import React, { useState } from 'react';
import { Code2, ChevronDown } from 'lucide-react';
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="container mx-auto px-4 py-6 flex items-center justify-between bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Code2 className="w-8 h-8 text-[#00FF7F]" />
        <span className="text-2xl font-bold font-press">
          edu<span className="text-[#00FF7F]">X</span>lite
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {/* Learn Dropdown */}
        <div className="relative">
          <button onClick={() => toggleMenu('learn')} className="hover:text-[#00FF7F] font-jaini text-2xl flex items-center gap-1 transition-colors">
            Learn <ChevronDown className="w-4 h-4" />
          </button>
          {openMenu === 'learn' && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Data Science</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Web Development</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Tools</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Computer Science</a>
            </div>
          )}
        </div>

        {/* Practice Dropdown */}
        <div className="relative">
          <button onClick={() => toggleMenu('practice')} className="hover:text-[#00FF7F] font-jaini text-2xl flex items-center gap-1 transition-colors">
            Practice <ChevronDown className="w-4 h-4" />
          </button>
          {openMenu === 'practice' && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Challenges</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Projects</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">#30DaysJourney</a>
            </div>
          )}
        </div>

        {/* Build Link */}
        <a href="#" className="hover:text-[#00FF7F] transition-colors font-jaini text-2xl">Build</a>

        {/* Community Dropdown */}
        <div className="relative">
          <button onClick={() => toggleMenu('community')} className="font-jaini text-2xl hover:text-[#00FF7F] flex items-center gap-1 transition-colors">
            Community <ChevronDown className="w-4 h-4" />
          </button>
          {openMenu === 'community' && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Twitter (X)</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Facebook</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">LinkedIn</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 font-regular">Github</a>
            </div>
          )}
        </div>

        {/* Courses Link */}
        <a href="#" className="hover:text-[#00FF7F] transition-colors font-jaini text-2xl">Courses</a>
      </div>

      {/* Login & Get Started Buttons */}
      <div className="hidden md:flex items-center gap-6">
      <button 
        href="/login" 
        onClick={(e) => { e.preventDefault(); navigate("/login"); }} 
        className="hover:text-[#00FF7F] transition-colors font-jaini text-3xl"
      >
        Login
      </button>
      <button 
        onClick={() => navigate("/register")} 
        className="bg-[#00FF7F] text-black px-6 py-2 rounded-full font-medium hover:bg-[#00CC6A] font-jaini text-3xl transition-colors"
      >
        Get Started
      </button>
    </div>
    </nav>
  );
}

export default Navbar;
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";

export default function App() {

   const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
      <div className={`${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} font-sans min-w-screen`}>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-indigo-900 via-blue-900 to-black">
        {/* Logo */}
        <div className="text-2xl font-bold">TutorFinder</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Day/Night toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-black/20 hover:bg-white/30"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>

          {/* Burger Icon for Mobile */}
          <button
            className="md:hidden text-2xl text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-gradient-to-b from-indigo-900 to-black">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
        </div>
      )}
    <div className="font-sans min-w-screen ">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white text-center py-10 px-6 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold ">
          Find Your Perfect Tutor
        </h1>

        <h2 className="text-3xl font-bold mt-20 mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className=" bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
            <p className="text-white">
              All tutors are background-checked and verified by our team.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-white">
              Book sessions at your convenience, online or in-person.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Affordable Rates</h3>
            <p className="text-white">
              Choose from a variety of price points that suit your budget.
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-15">
          Connect with expert tutors in any subject, anytime, anywhere.
        </p>
        <button className="mt-6 px-6 py-3 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white rounded-lg shadow hover:bg-gray-100">
          Get Started
        </button>
      </header>
    </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>
          © {new Date().getFullYear()} TutorFinder. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

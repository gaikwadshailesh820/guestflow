import { Link } from "react-router-dom";
import { useState } from "react";
import { HiBars3, HiXMark, HiMoon, HiSun } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();


  return (
    <nav className="bg-white dark:bg-slate-800 dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 dark:text-blue-400"
        >
          GuestFlow
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full flex items-center justify-center
             bg-gray-100 dark:bg-slate-700
             text-gray-700 dark:text-gray-200 dark:text-yellow-300
             hover:scale-110 transition-all duration-300"
          >
            {darkMode ? (
              <HiSun className="text-xl" />
            ) : (
              <HiMoon className="text-xl" />
            )}
          </button>

          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 dark:text-gray-200 hover:text-blue-700 transition"
          >
            Home
          </Link>

          <Link
            to="/rooms"
            className="text-gray-700 dark:text-gray-200 dark:text-gray-200 hover:text-blue-700 transition"
          >
            Rooms
          </Link>

          <Link
            to="/dashboard"
            className="text-gray-700 dark:text-gray-200 dark:text-gray-200 hover:text-blue-700 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="text-gray-700 dark:text-gray-200 dark:text-gray-200 hover:text-blue-700 transition"
          >
            Login
          </Link>

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow">
            S
          </div>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiXMark className="text-3xl" />
          ) : (
            <HiBars3 className="text-3xl" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-slate-800 dark:bg-slate-900">

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 text-gray-700 dark:text-gray-200 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            Home
          </Link>

          <Link
            to="/rooms"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 text-gray-700 dark:text-gray-200 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            Rooms
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 text-gray-700 dark:text-gray-200 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 text-gray-700 dark:text-gray-200 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            Login
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
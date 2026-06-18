import { Link } from "react-router-dom";
import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700"
        >
          GuestFlow
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-700 transition"
          >
            Home
          </Link>

          <Link
            to="/rooms"
            className="text-gray-700 hover:text-blue-700 transition"
          >
            Rooms
          </Link>

          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-700 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-700 transition"
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
        <div className="md:hidden border-t bg-white">

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Home
          </Link>

          <Link
            to="/rooms"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Rooms
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Login
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
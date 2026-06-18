import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700"
        >
          GuestFlow
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
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

          {/* Profile Icon */}
          <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold cursor-pointer">
            S
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
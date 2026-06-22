import { HiOutlineBell, HiOutlineSun, HiOutlineMoon, HiArrowRightOnRectangle } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

function Topbar({
  title,
  search,
  onSearchChange,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { darkMode, setDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (

    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-6 py-4 flex items-center">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
      >
        <HiBars3 className="text-2xl" />
      </button>

      <h1 className="ml-2 md:ml-0 flex-1 text-lg md:text-2xl font-bold text-gray-800 dark:text-white truncate">
        {title}
      </h1>

      {onSearchChange && (
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="hidden lg:block w-64 px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm"
        />
      )}

      <div className="flex items-center gap-2 md:gap-3 ml-2">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800"
        >
          {darkMode ? (
            <HiOutlineSun className="text-xl text-yellow-300" />
          ) : (
            <HiOutlineMoon className="text-xl" />
          )}
        </button>

        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800">
          <HiOutlineBell className="text-xl" />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs text-gray-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-red-600"
        >
          <HiArrowRightOnRectangle className="text-xl" />
        </button>

      </div>
    </header>
  );
}

export default Topbar;

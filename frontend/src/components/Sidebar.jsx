import { NavLink } from "react-router-dom";
import {
  HiSquares2X2,
  HiHomeModern,
  HiCalendarDays,
  HiUsers,
  HiChartBar,
  HiSparkles,
  HiCog6Tooth,
  HiXMark,
} from "react-icons/hi2";

import {
  useAuth,
  dashboardPathForRole,
  ROLES,
} from "../context/AuthContext";

function linksForRole(role) {
  const dashboard = {
    to: dashboardPathForRole(role),
    label: "Dashboard",
    icon: HiSquares2X2,
  };

  const shared = [
    { to: "/rooms", label: "Rooms", icon: HiHomeModern },
    { to: "/bookings", label: "Bookings", icon: HiCalendarDays },
    { to: "/guests", label: "Guests", icon: HiUsers },
    { to: "/ai-recommend", label: "AI Recommend", icon: HiSparkles },
  ];

  if (role === ROLES.MANAGER) {
    return [
      dashboard,
      ...shared,
      { to: "/reports", label: "Reports", icon: HiChartBar },
      { to: "/settings", label: "Settings", icon: HiCog6Tooth },
    ];
  }

  return [dashboard, ...shared];
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { role } = useAuth();

  const links = linksForRole(role);

  return (
    <>
      {/* Dark overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-60 h-screen
          bg-white dark:bg-slate-900
          border-r border-gray-200 dark:border-slate-800
          transform transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-800">

          <div>
            <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
              GuestFlow
            </span>

            <p className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">
              {role === ROLES.MANAGER ? "Manager Console" : "Front Desk"}
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <HiXMark size={26} />
          </button>

        </div>

        <nav className="p-3 space-y-1">

          {links.map(({ to, label, icon: Icon }) => (

            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon className="text-lg" />

              {label}

            </NavLink>

          ))}

        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
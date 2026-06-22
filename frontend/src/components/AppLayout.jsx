import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout({ title, search, onSearchChange, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 overflow-x-hidden">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 min-w-0">

        <Topbar
          title={title}
          search={search}
          onSearchChange={onSearchChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

export default AppLayout;
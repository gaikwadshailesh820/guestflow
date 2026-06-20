function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 dark:bg-slate-800 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-xl font-bold">GuestFlow</h2>
        <p className="mt-2 text-gray-400">
          AI Powered Hotel Room Management System
        </p>

        <div className="flex justify-center gap-6 mt-6">
          <a href="#">Home</a>
          <a href="#">Rooms</a>
          <a href="#">Dashboard</a>
          <a href="#">Login</a>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          © 2026 GuestFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
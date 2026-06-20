import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl">
            Welcome to the GuestFlow dashboard. Here, hotel managers and
            receptionists will be able to monitor room occupancy, manage
            bookings, and view hotel operations from a single place.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
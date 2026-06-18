import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 min-h-[70vh]">
        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl">
          Welcome to the GuestFlow dashboard. Here, hotel managers and
          receptionists will be able to monitor room occupancy, manage
          bookings, and view hotel operations from a single place.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
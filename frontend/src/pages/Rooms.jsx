import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";

function Rooms() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 min-h-[70vh]">

        <h1 className="text-4xl font-bold text-gray-800">
          Room Management
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl">
          View all hotel rooms, their availability, room type, and pricing.
          In future weeks, managers will be able to add, edit, and manage rooms
          from this page.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          <RoomCard
            title="Deluxe AC Room"
            price={2800}
            type="AC"
            status="Available"
          />

          <RoomCard
            title="Standard Room"
            price={1800}
            type="Non-AC"
            status="Occupied"
          />

          <RoomCard
            title="Family Suite"
            price={4500}
            type="AC"
            status="Available"
          />

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Rooms;
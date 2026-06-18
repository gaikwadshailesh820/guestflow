import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center text-gray-800">
          Why Choose GuestFlow?
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          GuestFlow simplifies hotel operations by helping managers and
          receptionists efficiently manage rooms, guests, and bookings with
          AI-powered assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          <FeatureCard
            icon="🤖"
            title="AI Room Recommendation"
            description="Suggests the best available room based on guest preferences, pricing, occupancy, and AC/Non-AC requirements."
          />

          <FeatureCard
            icon="🛏️"
            title="Room Management"
            description="Hotel managers can add, update, and monitor room availability, pricing, and maintenance from one dashboard."
          />

          <FeatureCard
            icon="👤"
            title="Guest Management"
            description="Receptionists can register guests, retrieve returning customer details, and manage check-ins and check-outs."
          />

        </div>

      </section>
      <Footer />
    </>
  );
}

export default Home;

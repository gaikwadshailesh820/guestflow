import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      {/* Why Choose GuestFlow */}
      <section className="w-full bg-white dark:bg-slate-950 py-20 transition-colors duration-300">

        <div className="text-center px-6">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose GuestFlow?
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-8">
            GuestFlow simplifies hotel operations by helping hotel managers and
            receptionists efficiently manage rooms, guests, and bookings with
            AI-powered assistance.
          </p>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <FeatureCard
              icon="🤖"
              title="AI Room Recommendation"
              description="Suggests the best available room based on guest preferences, pricing, occupancy, and AC/Non-AC requirements."
            />

            <FeatureCard
              icon="🛏️"
              title="Room Management"
              description="Hotel managers can add, update, monitor room availability, pricing, and maintenance from one dashboard."
            />

            <FeatureCard
              icon="👤"
              title="Guest Management"
              description="Receptionists can register guests, retrieve returning customer details, and manage check-ins and check-outs."
            />

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;
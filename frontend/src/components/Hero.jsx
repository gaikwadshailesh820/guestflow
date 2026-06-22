import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-14">

        {/* Left Section */}
        <div className="max-w-2xl text-center lg:text-left">

          <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
            🤖 AI-Powered Hotel Management
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Smart Room Allocation
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Made Effortless
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600  dark:text-gray-300 leading-8">
            GuestFlow helps hotels allocate rooms intelligently based on
            guest preferences like AC/Non-AC, pricing, occupancy, and
            real-time availability using AI recommendations.
          </p>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">

            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white px-7 py-3 rounded-xl font-semibold shadow-lg">
              Get Started
            </Link>

            <Link to="/rooms" className="border border-blue-600 text-blue-700 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:scale-105 transition-all duration-300 px-7 py-3 rounded-xl font-semibold">
              View Rooms
            </Link>

          </div>

        </div>

        {/* Right Section */}
        <div className="relative w-full flex justify-center">

          <div className="absolute -top-8 -left-2 lg:left-0 w-36 h-36 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

          <div className="absolute -bottom-8 -right-2 lg:right-0 w-40 h-40 bg-cyan-300 rounded-full blur-3xl opacity-30"></div>

          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-md hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Today's AI Recommendation
              </h3>

              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                LIVE
              </span>

            </div>

           <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 p-5">

              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Deluxe AC Room
              </h4>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                ₹2800 / Night
              </p>

              <div className="mt-5 flex justify-between items-center">

                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Available
                </span>

                <span className="text-blue-600 font-semibold">
                  96% Match
                </span>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Hotel Occupancy</span>
                <span>72%</span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-slate-600 overflow-hidden">

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full w-[72%]"></div>

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                <h4 className="text-2xl font-bold text-blue-600">148</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  Total Rooms
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                <h4 className="text-2xl font-bold text-green-600">41</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  Available
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


export default Hero;
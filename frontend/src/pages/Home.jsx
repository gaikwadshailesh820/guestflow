import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="p-10">
        <h1 className="text-4xl font-bold">
          Welcome to GuestFlow
        </h1>

        <p className="mt-3 text-gray-600">
          AI-powered hotel room management system.
        </p>
      </main>
    </>
  );
}

export default Home;
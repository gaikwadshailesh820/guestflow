function RoomCard({
  title,
  price,
  type,
  status,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      <div className="h-44 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-6xl">
        🛏️
      </div>

      <div className="p-6">

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-gray-500 mt-2">
          {type}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-blue-700 font-bold text-lg">
            ₹{price}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>

        </div>

        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
          View Details
        </button>

      </div>

    </div>
  );
}

export default RoomCard;
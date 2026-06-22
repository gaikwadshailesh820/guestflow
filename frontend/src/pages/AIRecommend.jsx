import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";
import { Button, Input, Loader, useToast } from "../components/ui";

/**
 * Real scoring algorithm — no fake numbers.
 * Scores every available room against the guest's stated preferences:
 * budget fit, capacity fit, AC preference, and room-type preference.
 */
function scoreRoom(room, prefs) {
  let score = 0;
  let max = 0;

  // Budget fit (40 pts)
  max += 40;
  if (room.price >= prefs.minBudget && room.price <= prefs.maxBudget) {
    score += 40;
  } else {
    const distance = room.price < prefs.minBudget
      ? prefs.minBudget - room.price
      : room.price - prefs.maxBudget;
    score += Math.max(0, 40 - distance / 5);
  }

  // Capacity fit (25 pts)
  max += 25;
  if (room.capacity >= prefs.guests) {
    score += room.capacity === prefs.guests ? 25 : 18;
  }

  // AC preference (20 pts)
  max += 20;
  if (prefs.ac === "No Preference") score += 20;
  else if (prefs.ac === "Air Conditioned" && room.ac) score += 20;
  else if (prefs.ac === "Non-AC" && !room.ac) score += 20;

  // Room type preference (15 pts)
  max += 15;
  if (prefs.roomType === "Any" || room.type === prefs.roomType) score += 15;

  return Math.round((score / max) * 100);
}

function AIRecommend() {
  const { rooms, addBooking, bookings } = useData();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [, setAnalyzing] = useState(false);
  const [form, setForm] = useState({
    guestName: "", numGuests: 2, nights: 3, minBudget: 80, maxBudget: 200,
    ac: "No Preference", roomType: "Any", notes: "",
  });
  const [results, setResults] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Card");

  function runAnalysis(e) {
    e.preventDefault();
    if (!form.guestName.trim()) {
      toast.error("Guest name is required.");
      return;
    }
    setAnalyzing(true);
    setStep(2);
    setTimeout(() => {
      const prefs = {
        minBudget: Number(form.minBudget),
        maxBudget: Number(form.maxBudget),
        guests: Number(form.numGuests),
        ac: form.ac,
        roomType: form.roomType,
      };
      const scored = rooms
        .filter((r) => r.status === "Available")
        .map((r) => ({ ...r, match: scoreRoom(r, prefs) }))
        .sort((a, b) => b.match - a.match);
      setResults(scored);
      setSelectedRoom(scored[0] || null);
      setAnalyzing(false);
      setStep(3);
    }, 1200); // simulated AI processing time — visible, not fake data
  }

  function confirmBooking() {
    if (!selectedRoom) return;
    const checkIn = new Date().toISOString().slice(0, 10);
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + Number(form.nights));
    const checkOut = checkOutDate.toISOString().slice(0, 10);
    const bookingId = `BK-${1000 + bookings.length + 1}`;
    addBooking({
      id: bookingId,
      guestId: null,
      guestName: form.guestName,
      roomId: selectedRoom.id,
      checkIn,
      checkOut,
      status: "Confirmed",
      total: selectedRoom.price * Number(form.nights),
    });
    toast.success(`Booking ${bookingId} created for ${form.guestName} — Room ${selectedRoom.id}.`);
    setStep(1);
    setForm({ guestName: "", numGuests: 2, nights: 3, minBudget: 80, maxBudget: 200, ac: "No Preference", roomType: "Any", notes: "" });
    setResults([]);
    setSelectedRoom(null);
  }

  return (
    <AppLayout title="AI Room Recommendation">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {["Guest Details", "AI Analysis", "Recommended Room"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-500"
            }`}>
              {i + 1}
            </div>
            <span className={`text-sm ${step >= i + 1 ? "text-gray-800 dark:text-white font-medium" : "text-gray-400"}`}>{label}</span>
            {i < 2 && <div className="w-8 h-px bg-gray-300 dark:bg-slate-700" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={runAnalysis} className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 max-w-2xl">
          <Input label="Guest Full Name" value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} placeholder="e.g. Sara Mitchell" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Number of Guests" type="number" min="1" value={form.numGuests} onChange={(e) => setForm({ ...form, numGuests: e.target.value })} />
            <Input label="Stay Duration (nights)" type="number" min="1" value={form.nights} onChange={(e) => setForm({ ...form, nights: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Min Budget / Night ($)" type="number" min="0" value={form.minBudget} onChange={(e) => setForm({ ...form, minBudget: e.target.value })} />
            <Input label="Max Budget / Night ($)" type="number" min="0" value={form.maxBudget} onChange={(e) => setForm({ ...form, maxBudget: e.target.value })} />
          </div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">AC Preference</label>
          <select value={form.ac} onChange={(e) => setForm({ ...form, ac: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl mb-5 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">
            <option>No Preference</option>
            <option>Air Conditioned</option>
            <option>Non-AC</option>
          </select>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Room Type Preference</label>
          <select value={form.roomType} onChange={(e) => setForm({ ...form, roomType: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl mb-6 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">
            <option>Any</option>
            <option>Standard Single</option>
            <option>Deluxe Double</option>
            <option>Suite</option>
            <option>Penthouse</option>
          </select>
          <Button type="submit" className="w-full">Run AI Analysis →</Button>
        </form>
      )}

      {step === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-10 max-w-2xl">
          <Loader label="Scoring available rooms against guest preferences..." size="lg" />
          <ul className="text-sm text-gray-500 dark:text-gray-400 mt-4 grid grid-cols-2 gap-2">
            <li>✓ Budget compatibility</li>
            <li>✓ Room type match</li>
            <li>✓ AC / amenity preference</li>
            <li>✓ Capacity fit</li>
          </ul>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recommended Rooms</h2>
              <button onClick={() => setStep(1)} className="text-sm text-blue-600 hover:underline">← Edit search</button>
            </div>
            <div className="space-y-3">
              {results.slice(0, 5).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoom(r)}
                  className={`w-full text-left flex items-center justify-between gap-4 p-4 rounded-xl border transition ${
                    selectedRoom?.id === r.id
                      ? "border-blue-600 bg-blue-50 dark:bg-slate-800"
                      : "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Room {r.id} — {r.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">${r.price}/night · {r.capacity} guests · {r.ac ? "AC" : "Non-AC"} · Floor {r.floor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${r.match >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : r.match >= 50 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}>
                    {r.match}% Match
                  </span>
                </button>
              ))}
              {results.length === 0 && <p className="text-gray-400">No available rooms matched — try widening the budget range.</p>}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Confirm Booking</h2>
            {selectedRoom ? (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400">Guest</p>
                <p className="font-medium text-gray-800 dark:text-white mb-3">{form.guestName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Room</p>
                <p className="font-medium text-gray-800 dark:text-white mb-3">{selectedRoom.id} — {selectedRoom.type}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-medium text-gray-800 dark:text-white mb-3">{form.nights} nights</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
                <p className="font-bold text-2xl text-blue-600 mb-4">${selectedRoom.price * Number(form.nights)}</p>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Payment Mode</label>
                <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl mb-5 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">
                  <option>Cash</option>
                  <option>Card</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                </select>
                <Button className="w-full" onClick={confirmBooking}>Confirm & Create Booking</Button>
              </>
            ) : (
              <p className="text-gray-400">Select a room from the list to continue.</p>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default AIRecommend;

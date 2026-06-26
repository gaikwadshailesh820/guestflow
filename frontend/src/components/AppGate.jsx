import { useData } from "../context/DataContext";
import { Loader } from "./ui";
import App from "../App";

/**
 * Renders the app once the initial backend fetch (rooms/guests/bookings/
 * activity) completes. Keeps the loading-state handling in one place
 * instead of repeating it on every page.
 */
function AppGate() {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <Loader size="lg" label="Connecting to GuestFlow server..." />
      </div>
    );
  }

  return <App />;
}

export default AppGate;

/**
 * Reusable Loader Component
 *
 * @param {Object} props
 * @param {string} [props.label] - Loading message.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Loader size.
 */

function Loader({ variant = "spinner", size = "md", rows = 3, label }) {
  if (variant === "skeleton") {
    return (
      <div className="space-y-3 w-full animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-gray-200 dark:bg-slate-700 w-full" />
        ))}
      </div>
    );
  }

  const sizes = { sm: "w-5 h-5 border-2", md: "w-8 h-8 border-3", lg: "w-12 h-12 border-4" };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div
        className={`${sizes[size]} rounded-full border-blue-600 border-t-transparent animate-spin`}
      />
      {label && <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>}
    </div>
  );
}

export default Loader;

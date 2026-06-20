/**
 * Reusable Input Component
 *
 * @param {string} label
 * @param {string} type
 * @param {string} placeholder
 * @param {string} value
 * @param {function} onChange
 * @param {string} error
 */

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition
        ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
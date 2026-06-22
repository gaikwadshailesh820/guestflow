/**
 * Reusable Input Component
 *
 * @param {Object} props
 * @param {string} props.value - Input value.
 * @param {Function} props.onChange - Change handler.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.type="text"] - Input type.
 * @param {boolean} [props.disabled=false] - Disable input.
 * @param {string} [props.className] - Additional Tailwind classes.
 */

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  name,
  min,
  max,
  required,
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
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
        ${error ? "border-red-500" : "border-gray-300 dark:border-slate-600"}`}
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
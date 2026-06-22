/**
 * Reusable Button Component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content.
 * @param {"primary"|"secondary"|"outline"} [props.variant="primary"] - Button style.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Button size.
 * @param {boolean} [props.disabled=false] - Disables the button.
 * @param {Function} props.onClick - Click event handler.
 * @param {string} [props.className] - Additional Tailwind classes.
 */

function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl
        font-semibold
        transition
        duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
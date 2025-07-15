"use client";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:via-violet-700 hover:to-purple-800 border border-purple-400/50 shadow-lg shadow-purple-500/25 text-white",
    secondary:
      "border-gray-600 hover:bg-gray-800/80 bg-gray-900/50 backdrop-blur-sm text-gray-200 hover:text-white border-2",
    ghost: "hover:bg-gray-800/60 text-gray-400 hover:text-white",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

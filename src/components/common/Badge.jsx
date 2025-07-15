const Badge = ({ children, variant = "gray", className = "" }) => {
  const variants = {
    purple: "bg-purple-600/30 text-purple-300 border-purple-500/50",
    cyan: "bg-cyan-600/30 text-cyan-300 border-cyan-500/50",
    gray: "bg-gray-700/60 text-gray-200 border-gray-600/50",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

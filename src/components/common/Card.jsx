const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-gray-900/40 border-gray-700/50 backdrop-blur-xl shadow-2xl border rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

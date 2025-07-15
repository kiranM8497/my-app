import { VenetianMaskIcon as Mask } from "lucide-react";

const Avatar = ({ size = "medium", src, alt = "Avatar" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-24 h-24",
    xlarge: "w-32 h-32",
  };

  const iconSizes = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-8 h-8",
    xlarge: "w-12 h-12",
  };

  const textSizes = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-2xl",
    xlarge: "text-4xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-4 border-purple-500/70 shadow-2xl shadow-purple-500/40 ring-2 ring-purple-400/30 rounded-full overflow-hidden`}
    >
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full bg-gray-900 flex items-center justify-center text-purple-300 font-bold ${textSizes[size]}`}
        >
          <Mask className={iconSizes[size]} />
        </div>
      )}
    </div>
  );
};

export default Avatar;

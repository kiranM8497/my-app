// Example: In your Header/Navbar component
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Logout will still clear user state and redirect
    }
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h1>Welcome, {user.firstname}!</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

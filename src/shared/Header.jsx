import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import Navigation from "./Navigation.jsx";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOff = async () => {
    const result = await logout();

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {isAuthenticated && (
        <button type="button" onClick={handleLogOff}>
          Log Off
        </button>
      )}
    </header>
  );
}

export default Header;
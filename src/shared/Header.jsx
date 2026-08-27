import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");

  const handleLogOff = async () => {
    setLogoutError("");

    const result = await logout();

    if (!result.success) {
      setLogoutError(result.error);
    }
  };

  return (
    <header>
      <h1>Todo List</h1>

      {logoutError && <p>{logoutError}</p>}

      {isAuthenticated && (
        <button type="button" onClick={handleLogOff}>
          Log Off
        </button>
      )}
    </header>
  );
}

export default Header;
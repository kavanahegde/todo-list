import { useAuth } from "../contexts/AuthContext.jsx";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogOff = async () => {
    await logout();
  };

  return (
    <header>
      <h1>Todo List</h1>

      {isAuthenticated && (
        <button type="button" onClick={handleLogOff}>
          Log Off
        </button>
      )}
    </header>
  );
}

export default Header;
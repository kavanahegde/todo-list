import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOff = async () => {
    const result = await logout();

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <button type="button" onClick={handleLogOff}>
      Log Off
    </button>
  );
}

export default Logoff;
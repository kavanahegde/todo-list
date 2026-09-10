import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user originally wanted to visit.
  // If there isn't one, go to /todos after login.
  const from = location.state?.from?.pathname || "/todos";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoggingOn(true);
    setAuthError("");

    const result = await login(email, password);

    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-heading">
          <p className="eyebrow">Welcome back</p>
          <h2>Log in to your account</h2>
          <p>
            Sign in to manage your todos and track your progress.
          </p>
        </div>

        {authError && (
          <p className="error-message" role="alert">
            {authError}
          </p>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="login-button"
            type="submit"
            disabled={isLoggingOn}
          >
            {isLoggingOn ? "Logging in..." : "Log On"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
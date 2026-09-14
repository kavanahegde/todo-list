import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <p className="error-code">404</p>

        <h2>Page Not Found</h2>

        <p className="page-description">
          Sorry, the page you are looking for does not exist or may
          have been moved.
        </p>

        <div className="not-found-links">
          <Link className="primary-link" to="/">
            Go to Home
          </Link>

          <Link to="/about">About</Link>

          <Link to="/todos">Todos</Link>

          <Link to="/login">Login</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
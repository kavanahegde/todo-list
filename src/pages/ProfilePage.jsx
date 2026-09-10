import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function ProfilePage() {
  const { email, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        };

        const response = await fetch("/api/tasks", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todos = data.tasks ?? data;

        const total = todos.length;
        const completed = todos.filter(
          (todo) => todo.isCompleted
        ).length;
        const active = total - completed;

        setTodoStats({
          total,
          completed,
          active,
        });
      } catch (error) {
        setError(`Error loading statistics: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round(
          (todoStats.completed / todoStats.total) * 100
        )
      : 0;

  return (
    <main className="page-container profile-page">
      <section className="page-hero">
        <p className="eyebrow">Your workspace</p>
        <h2>Profile</h2>
        <p className="page-description">
          Review your account information and task progress.
        </p>
      </section>

      <div className="info-grid">
        <section className="info-card">
          <h3>Account Information</h3>

          <div className="account-details">
            <p>
              <span>Name</span>
              <strong>{email || "User"}</strong>
            </p>

            <p>
              <span>Status</span>
              <strong>Authenticated</strong>
            </p>
          </div>
        </section>

        <section className="info-card">
          <h3>Todo Statistics</h3>

          {loading && <p>Loading statistics...</p>}

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="stats-grid">
              <article className="stat-card">
                <span>Total</span>
                <strong>{todoStats.total}</strong>
              </article>

              <article className="stat-card">
                <span>Completed</span>
                <strong>{todoStats.completed}</strong>
              </article>

              <article className="stat-card">
                <span>Active</span>
                <strong>{todoStats.active}</strong>
              </article>

              <article className="stat-card">
                <span>Completion</span>
                <strong>{completionPercentage}%</strong>
              </article>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
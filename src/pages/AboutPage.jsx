function AboutPage() {
  return (
    <main className="page-container about-page">
      <section className="page-hero">
        <p className="eyebrow">About the project</p>
        <h2>About This App</h2>
        <p className="page-description">
          A responsive React todo application with authentication,
          filtering, sorting, editing, and task completion features.
        </p>
      </section>

      <div className="info-grid">
        <section className="info-card">
          <h3>Features</h3>

          <ul className="feature-list">
            <li>Create todos</li>
            <li>Update todos</li>
            <li>Complete and reopen todos</li>
            <li>Search and sort todos</li>
            <li>Filter todos by status</li>
            <li>User authentication</li>
          </ul>
        </section>

        <section className="info-card">
          <h3>Technologies Used</h3>

          <ul className="feature-list">
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
            <li>Context API</li>
            <li>useReducer</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;
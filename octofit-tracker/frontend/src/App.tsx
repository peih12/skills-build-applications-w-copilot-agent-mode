function App() {
  return (
    <main className="container py-5">
      <section className="text-center">
        <h1 className="mb-3">OctoFit Tracker</h1>
        <p className="lead">
          Modern multi-tier fitness tracking with React, Vite, Node.js, Express, and MongoDB.
        </p>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2>Frontend</h2>
                <p>React 19 + Vite running at port 5173.</p>
                <h2>Backend</h2>
                <p>Express + TypeScript API running at port 8000.</p>
                <h2>Database</h2>
                <p>MongoDB is configured to use port 27017.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

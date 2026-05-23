import { NavLink, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import { apiHost } from "./api";

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="lead">
          Frontend built with React 19, Vite, and react-router-dom.
        </p>
        <div className="alert alert-info">
          API host: <strong>{apiHost}</strong>
          <br />
          <small>
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces
            support, otherwise localhost is used.
          </small>
        </div>
      </header>

      <nav className="mb-4">
        <div className="nav nav-tabs">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/activities" className="nav-link">
            Activities
          </NavLink>
          <NavLink to="/teams" className="nav-link">
            Teams
          </NavLink>
          <NavLink to="/workouts" className="nav-link">
            Workouts
          </NavLink>
          <NavLink to="/leaderboard" className="nav-link">
            Leaderboard
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h2>Welcome to OctoFit Tracker</h2>
                      <p>
                        Browse users, activities, teams, workouts, and leaderboard results from the backend API.
                      </p>
                      <p>
                        The app uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build
                        backend URLs like{' '}
                        <code>https://&lt;codespace&gt;-8000.app.github.dev/api/[component]/</code>.
                      </p>
                      <p>
                        If <code>VITE_CODESPACE_NAME</code> is unset, the client falls back to{' '}
                        <code>http://localhost:8000</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;

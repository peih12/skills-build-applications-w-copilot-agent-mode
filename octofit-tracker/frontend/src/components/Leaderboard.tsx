import { useEffect, useState } from "react";
import { fetchApi, normalizeArrayResponse } from "../api";

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<{ leaderboard: any[] }>("leaderboard")
      .then((payload) => setEntries(normalizeArrayResponse(payload, "leaderboard")))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Score</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name || "Unknown"}</td>
              <td>{entry.team?.name || "Solo"}</td>
              <td>{entry.score}</td>
              <td>{entry.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!error && entries.length === 0 && <p className="text-muted">No leaderboard entries yet.</p>}
    </div>
  );
}

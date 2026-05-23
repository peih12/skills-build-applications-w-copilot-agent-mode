import { useEffect, useState } from "react";
import { fetchApi, normalizeArrayResponse } from "../api";

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<{ teams: any[] }>("teams")
      .then((payload) => setTeams(normalizeArrayResponse(payload, "teams")))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id} className="list-group-item">
            <h5>{team.name}</h5>
            <p>{team.description || "No description."}</p>
            <small>{team.members?.length ?? 0} members</small>
          </div>
        ))}
      </div>
      {!error && teams.length === 0 && <p className="text-muted">No teams available yet.</p>}
    </div>
  );
}

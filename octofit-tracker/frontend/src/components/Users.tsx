import { useEffect, useState } from "react";
import { fetchApi, normalizeArrayResponse } from "../api";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<{ users: any[] }>("users")
      .then((payload) => setUsers(normalizeArrayResponse(payload, "users")))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id} className="list-group-item">
            <h5>{user.name}</h5>
            <p>{user.email}</p>
            <small>{user.goals || "No goals set."}</small>
          </div>
        ))}
      </div>
      {!error && users.length === 0 && <p className="text-muted">No users available yet.</p>}
    </div>
  );
}

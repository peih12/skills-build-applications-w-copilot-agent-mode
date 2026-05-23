import { useEffect, useState } from "react";
import { fetchApi, normalizeArrayResponse } from "../api";

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<{ activities: any[] }>("activities")
      .then((payload) => setActivities(normalizeArrayResponse(payload, "activities")))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gy-3">
        {activities.map((activity) => (
          <div key={activity._id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{activity.name}</h5>
                <p className="mb-1">Type: {activity.type}</p>
                <p className="mb-1">Duration: {activity.durationMinutes} minutes</p>
                <p className="mb-1">Calories: {activity.caloriesBurned ?? 0}</p>
                <p className="text-muted">{activity.notes || "No notes."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!error && activities.length === 0 && <p className="text-muted">No activities available yet.</p>}
    </div>
  );
}

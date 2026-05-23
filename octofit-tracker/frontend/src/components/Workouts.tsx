import { useEffect, useState } from "react";
import { fetchApi, normalizeArrayResponse } from "../api";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<{ workouts: any[] }>("workouts")
      .then((payload) => setWorkouts(normalizeArrayResponse(payload, "workouts")))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gy-3">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p>{workout.description || "No description."}</p>
                <p className="mb-1">Difficulty: {workout.difficulty}</p>
                <p className="mb-1">Duration: {workout.durationMinutes} minutes</p>
                <div>
                  <strong>Exercises</strong>
                  <ul>
                    {(workout.exercises ?? []).map((exercise: any, index: number) => (
                      <li key={index}>{exercise.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!error && workouts.length === 0 && <p className="text-muted">No workouts available yet.</p>}
    </div>
  );
}

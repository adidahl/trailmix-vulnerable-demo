import React, { useEffect, useState } from 'react';
import { getTrip } from '../api.js';
import TripNotes from '../components/TripNotes.jsx';

export default function TripPage({ id, onBack }) {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    getTrip(id).then(setTrip).catch(() => setTrip(null));
  }, [id]);

  if (!trip) return <p>Loading...</p>;

  return (
    <main>
      <button onClick={onBack}>Back</button>
      <h1>{trip.title}</h1>
      <TripNotes notes={trip.notes} />
    </main>
  );
}

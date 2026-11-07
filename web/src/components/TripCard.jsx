import React from 'react';

export default function TripCard({ trip, onOpen }) {
  return (
    <article className="trip-card" onClick={onOpen}>
      <h2>{trip.title}</h2>
      <p>{trip.region}</p>
    </article>
  );
}

import React, { useEffect, useState } from 'react';
import { listTrips, searchTrips } from './api.js';
import LoginForm from './components/LoginForm.jsx';
import SearchBox from './components/SearchBox.jsx';
import TripCard from './components/TripCard.jsx';
import TripPage from './pages/TripPage.jsx';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [trips, setTrips] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (signedIn) listTrips().then(setTrips).catch(() => setTrips([]));
  }, [signedIn]);

  if (!signedIn) return <LoginForm onDone={() => setSignedIn(true)} />;
  if (openId) return <TripPage id={openId} onBack={() => setOpenId(null)} />;

  return (
    <main>
      <h1>Your trips</h1>
      <SearchBox onSearch={(t) => searchTrips(t).then(setTrips)} />
      {trips.map((t) => (
        <TripCard key={t.id} trip={t} onOpen={() => setOpenId(t.id)} />
      ))}
    </main>
  );
}

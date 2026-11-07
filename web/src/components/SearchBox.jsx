import React, { useState } from 'react';

export default function SearchBox({ onSearch }) {
  const [term, setTerm] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(term);
      }}
    >
      <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search public trips" />
      <button type="submit">Search</button>
    </form>
  );
}

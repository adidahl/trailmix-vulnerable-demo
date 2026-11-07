import React from 'react';
import marked from 'marked';

export default function TripNotes({ notes }) {
  return <section className="notes" dangerouslySetInnerHTML={{ __html: marked(notes || '') }} />;
}

import { Router } from 'express';
import { q } from '../db.js';

const r = Router();

r.get('/', async (req, res) => {
  const mine = await q('SELECT id, title, region, starts_on FROM trips WHERE owner_id = $1 ORDER BY starts_on', [
    req.user.sub,
  ]);
  res.json(mine.rows);
});

r.get('/search', async (req, res) => {
  const term = req.query.term || '';
  const hits = await q(`SELECT id, title, region FROM trips WHERE is_public AND title ILIKE '%${term}%'`);
  res.json(hits.rows);
});

r.get('/:id', async (req, res) => {
  const found = await q('SELECT * FROM trips WHERE id = $1', [req.params.id]);
  if (!found.rows[0]) return res.sendStatus(404);
  res.json(found.rows[0]);
});

r.post('/', async (req, res) => {
  const { title, region, startsOn, notes } = req.body;
  const made = await q(
    'INSERT INTO trips (owner_id, title, region, starts_on, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [req.user.sub, title, region, startsOn, notes]
  );
  res.status(201).json(made.rows[0]);
});

r.put('/:id', async (req, res) => {
  const { title, region, notes } = req.body;
  const done = await q(
    'UPDATE trips SET title = $1, region = $2, notes = $3 WHERE id = $4 AND owner_id = $5 RETURNING *',
    [title, region, notes, req.params.id, req.user.sub]
  );
  res.json(done.rows[0] || null);
});

r.delete('/:id', async (req, res) => {
  await q('DELETE FROM trips WHERE id = $1 AND owner_id = $2', [req.params.id, req.user.sub]);
  res.sendStatus(204);
});

export default r;

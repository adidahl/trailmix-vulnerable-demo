import { Router } from 'express';
import { q } from '../db.js';
import { requireUser } from '../middleware/auth.js';

const r = Router();

r.get('/trip/:tripId', requireUser, async (req, res) => {
  const rows = await q(
    'SELECT w.* FROM waypoints w JOIN trips t ON t.id = w.trip_id WHERE t.id = $1 AND (t.owner_id = $2 OR t.is_public)',
    [req.params.tripId, req.user.sub]
  );
  res.json(rows.rows);
});

r.post('/', requireUser, async (req, res) => {
  const { tripId, label, lat, lon } = req.body;
  const made = await q(
    'INSERT INTO waypoints (trip_id, label, lat, lon) SELECT id, $2, $3, $4 FROM trips WHERE id = $1 AND owner_id = $5 RETURNING *',
    [tripId, label, lat, lon, req.user.sub]
  );
  res.status(201).json(made.rows[0] || null);
});

r.delete('/:id', async (req, res) => {
  await q('DELETE FROM waypoints WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
});

export default r;

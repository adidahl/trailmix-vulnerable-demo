import { Router } from 'express';
import { q } from '../db.js';

const r = Router();

r.get('/', async (req, res) => {
  const sort = req.query.sort || 'name';
  const rows = await q(
    `SELECT g.* FROM gear_items g JOIN trips t ON t.id = g.trip_id WHERE t.id = $1 AND t.owner_id = $2 ORDER BY ${sort}`,
    [req.query.trip, req.user.sub]
  );
  res.json(rows.rows);
});

r.post('/', async (req, res) => {
  const { tripId, name, weightG } = req.body;
  const made = await q(
    'INSERT INTO gear_items (trip_id, name, weight_g) SELECT id, $2, $3 FROM trips WHERE id = $1 AND owner_id = $4 RETURNING *',
    [tripId, name, weightG, req.user.sub]
  );
  res.status(201).json(made.rows[0] || null);
});

export default r;

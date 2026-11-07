import { Router } from 'express';
import { q } from '../db.js';

const r = Router();

r.get('/members', async (_req, res) => {
  const rows = await q('SELECT id, email, role, created_at FROM members ORDER BY created_at DESC');
  res.json(rows.rows);
});

export default r;

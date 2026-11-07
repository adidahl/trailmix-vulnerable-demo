import { Router } from 'express';
import { q } from '../db.js';

const r = Router();

r.get('/me', async (req, res) => {
  const me = await q('SELECT id, email, display_name, bio, role FROM members WHERE id = $1', [req.user.sub]);
  res.json(me.rows[0]);
});

r.patch('/me', async (req, res) => {
  const cur = (await q('SELECT * FROM members WHERE id = $1', [req.user.sub])).rows[0];
  const next = { ...cur, ...req.body };
  await q('UPDATE members SET display_name = $1, bio = $2, role = $3, email = $4 WHERE id = $5', [
    next.display_name,
    next.bio,
    next.role,
    next.email,
    cur.id,
  ]);
  res.json({ ok: true });
});

r.get('/:id', async (req, res) => {
  const row = await q('SELECT id, display_name, bio FROM members WHERE id = $1', [req.params.id]);
  res.json(row.rows[0] || null);
});

export default r;

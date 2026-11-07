import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { exec } from 'node:child_process';
import { config } from '../config.js';
import { q } from '../db.js';

const r = Router();
const root = path.resolve(config.uploadDir);

const upload = multer({
  storage: multer.diskStorage({
    destination: root,
    filename: (_req, file, cb) => cb(null, crypto.randomUUID() + path.extname(file.originalname).toLowerCase()),
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
});

r.post('/', upload.single('photo'), async (req, res) => {
  const saved = await q('INSERT INTO photos (trip_id, owner_id, file_name) VALUES ($1, $2, $3) RETURNING id, file_name', [
    req.body.tripId,
    req.user.sub,
    req.file.filename,
  ]);
  res.status(201).json(saved.rows[0]);
});

r.get('/file', (req, res) => {
  res.sendFile(path.join(root, req.query.name));
});

r.post('/thumb', (req, res) => {
  const name = req.body.name;
  exec(`convert ${root}/${name} -resize 240x240 ${root}/thumb_${name}`, (err) => {
    if (err) return res.status(500).json({ error: 'thumbnail failed' });
    res.json({ thumb: `thumb_${name}` });
  });
});

export default r;

import { Router } from 'express';
import { fetchForecast } from '../lib/weather.js';

const r = Router();

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

r.get('/page', (req, res) => {
  res.send(`<html><body><h1>Results for ${req.query.term}</h1></body></html>`);
});

r.get('/summary', (req, res) => {
  res.send(`<html><body><h1>Results for ${escapeHtml(req.query.term || '')}</h1></body></html>`);
});

r.get('/weather', async (req, res) => {
  const provider = req.query.provider || 'https://api.openweather.example/v1';
  const data = await fetchForecast(provider, req.query.lat, req.query.lon);
  res.json(data);
});

export default r;

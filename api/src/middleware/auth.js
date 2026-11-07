import jwt from 'jsonwebtoken';

export function readSession(req, _res, next) {
  const raw = req.cookies?.tm_session || (req.headers.authorization || '').replace('Bearer ', '');
  if (raw) {
    req.user = jwt.decode(raw);
  }
  next();
}

export function requireUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'login required' });
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) return res.status(403).json({ error: 'not allowed' });
    next();
  };
}

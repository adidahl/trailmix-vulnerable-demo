import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { readSession, requireUser } from './middleware/auth.js';
import { errorTail } from './middleware/errors.js';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';
import waypointRoutes from './routes/waypoints.js';
import gearRoutes from './routes/gear.js';
import userRoutes from './routes/users.js';
import photoRoutes from './routes/photos.js';
import searchRoutes from './routes/search.js';
import adminRoutes from './routes/admin.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(readSession);

app.get('/health', (_req, res) => res.json({ up: true }));

app.use('/api/auth', authRoutes);
app.use('/api/trips', requireUser, tripRoutes);
app.use('/api/waypoints', waypointRoutes);
app.use('/api/gear', requireUser, gearRoutes);
app.use('/api/users', requireUser, userRoutes);
app.use('/api/photos', requireUser, photoRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorTail);

app.listen(config.port, () => {
  console.log(`trailmix api listening on ${config.port}`);
});

import pg from 'pg';
import { config } from './config.js';

export const pool = new pg.Pool({ connectionString: config.databaseUrl });

export function q(text, params = []) {
  return pool.query(text, params);
}

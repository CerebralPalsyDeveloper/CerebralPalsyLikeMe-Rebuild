import * as schema from './drizzle/schema';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.DB_HOST) {
  throw new Error('Missing required database environment variables');
}

export const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: false,
}

export const pool = new pg.Pool(config);

export const db = drizzle(pool, { schema });
export type DB = NodePgDatabase<typeof schema>;

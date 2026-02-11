import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.join(__dirname, 'mealmath.db');

async function initDatabase() {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database
  });

  await db.exec('PRAGMA foreign_keys = ON;');

  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  await db.exec(schema);

  const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
  await db.exec(seed);

  return db;
}

export default initDatabase;

import { connect } from './db.js';

export async function initDb() {
  const db = await connect();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pokemons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      treinador TEXT NOT NULL,
      nivel INTEGER DEFAULT 1
    );
  `);
}

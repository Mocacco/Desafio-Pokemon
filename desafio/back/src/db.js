// src/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function connect() {
  const db = await open({
    filename: './src/database.sqlite',
    driver: sqlite3.Database
  });
  return db;
}

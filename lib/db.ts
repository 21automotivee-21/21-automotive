// SQLite storage for bookings and financing applications, backed by Node's
// built-in node:sqlite module — no extra dependencies to install.
//
// The connection is cached on globalThis so Next.js dev-mode hot reloads reuse
// one handle instead of opening a new one on every recompile.

import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.join(process.cwd(), "data", "data.sqlite");

/** USD, refundable. See the note on deposit handling in app/api/bookings/route.ts. */
export const DEPOSIT_AMOUNT = 100;

function createDatabase() {
  const db = new DatabaseSync(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicle_id TEXT,
      vehicle_name TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      preferred_time TEXT,
      message TEXT,
      deposit_requested INTEGER NOT NULL DEFAULT 0,
      deposit_amount INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending_confirmation',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS finance_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicle_id TEXT,
      vehicle_name TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      budget_range TEXT NOT NULL,
      est_car_price REAL,
      est_down_payment REAL,
      est_monthly_payment REAL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

const globalForDb = globalThis as unknown as { __automotiveDb?: DatabaseSync };

export function getDb(): DatabaseSync {
  globalForDb.__automotiveDb ??= createDatabase();
  return globalForDb.__automotiveDb;
}

export const ADMIN_KEY = process.env.ADMIN_KEY || "dev-admin-key";

/** Admin list endpoints are gated on a shared header key. */
export function isAuthorizedAdmin(request: Request): boolean {
  return request.headers.get("x-admin-key") === ADMIN_KEY;
}

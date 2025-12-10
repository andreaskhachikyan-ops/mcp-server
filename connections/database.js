import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function databaseTool({ sql }) {
  if (!sql) throw new Error("sql required");

  const db = await open({
    filename: "./data.db",
    driver: sqlite3.Database
  });

  const rows = await db.all(sql);
  return rows;
}

import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env["NEON_DATABASE_URL"];
  if (!url) throw new Error("NEON_DATABASE_URL missing");
  return neon(url);
}

export function assertAdmin(password: string) {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected || password !== expected) {
    throw new Error("Falsches Passwort");
  }
}

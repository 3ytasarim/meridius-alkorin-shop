import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env["NEON_DATABASE_URL"];
  if (!url) throw new Error("NEON_DATABASE_URL missing");
  return neon(url);
}

export function assertAdmin(username: string, password: string) {
  const expectedUser = process.env["ADMIN_USERNAME"];
  const expectedPass = process.env["ADMIN_PASSWORD"];
  if (!expectedUser || !expectedPass || username !== expectedUser || password !== expectedPass) {
    throw new Error("Falscher Benutzername oder Passwort");
  }
}

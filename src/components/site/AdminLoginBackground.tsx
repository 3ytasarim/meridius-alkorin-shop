/**
 * Animiertes Punktraster hinter dem Admin-Login – reines CSS statt WebGL/
 * Three.js. Der ursprüngliche Shader-Ansatz (Referenzkomponente des Nutzers)
 * lief in dieser Umgebung nicht zuverlässig über alle Browser/Tunnel-Setups
 * (kein Fehler, aber inkonsistentes Rendering) – ein `background-image` mit
 * mehreren `radial-gradient`-Ebenen gibt dieselbe farbige Punkte-Optik in
 * Markenfarben, garantiert ohne JS/GPU-Abhängigkeit.
 */
export function AdminLoginBackground() {
  return (
    <div
      aria-hidden="true"
      className="admin-dot-grid pointer-events-none absolute inset-0"
    />
  );
}

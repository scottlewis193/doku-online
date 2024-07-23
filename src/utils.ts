export function generateSessionId() {
  return Math.floor(Math.random() * Date.now());
}

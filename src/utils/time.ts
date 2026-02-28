export function formatTime(raw?: string): string {
  if (!raw) return "";
  const deadline = new Date(raw);
  return `${deadline.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

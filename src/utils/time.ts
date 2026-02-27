export function formatDeadline(raw: string): { text: string; isOverdue: boolean } {
  const deadline = new Date(raw);
  const now = new Date();
  const isOverdue = deadline.getTime() - now.getTime() < 0;

  let text: string;
  if (isOverdue) {
    text = `${deadline.toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" })}`;
  } else {
    text = `${deadline.toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" })}`;
  }

  return { text, isOverdue };
}
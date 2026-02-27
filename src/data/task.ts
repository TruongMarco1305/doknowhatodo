import type { KanbanColumn, TaskPriority } from "@/types/task";

export const COLUMN_DEFS: Omit<KanbanColumn, "tasks">[] = [
  {
    id: "TODO",
    label: "Todo",
    description: "This item hasn't been started",
    color: "#22c55e",
  },
  {
    id: "IN_PROGRESS",
    label: "In Progress",
    description: "This is actively being worked on",
    color: "#f59e0b",
  },
  {
    id: "REVIEW",
    label: "Review",
    description: "This item is being reviewed",
    color: "#ec4899",
  },
  {
    id: "DONE",
    label: "Done",
    description: "This has been completed",
    color: "#a855f7",
  },
];

export const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: string; bg: string }
> = {
  LOW:    { label: "Low",    color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  MEDIUM: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  HIGH:   { label: "High",   color: "#ef4444", bg: "rgba(239,68,68,0.12)"  },
};

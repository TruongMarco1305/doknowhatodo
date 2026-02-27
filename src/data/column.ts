import type { KanbanColumn } from "@/types/task";

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
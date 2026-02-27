export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: string;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type KanbanColumn = {
  id: TaskStatus;
  label: string;
  description: string;
  color: string;
  tasks: Task[];
};

export interface CreateTaskResponse {
  createTask: {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateTaskVariables {
  data: {
    title: string;
    description?: string;
    priority: TaskPriority;
    deadline?: string;
  };
}
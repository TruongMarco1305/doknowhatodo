import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import type {
  Task,
  KanbanColumn,
  TaskStatus,
  CreateTaskResponse,
  CreateTaskVariables,
} from "@/types/task";
import KanbanColumnComponent from "@/components/kanban/kanban-column";
import KanbanCard from "@/components/kanban/kanban-card";
import { IconPlus, IconSearch } from "@douyinfe/semi-icons";
import { Button, Input, Notification } from "@douyinfe/semi-ui-19";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_INITIAL_DATA } from "@/graphql/queries/task";
import GlobalLoading from "@/components/global-loading";
import { COLUMN_DEFS } from "@/data/column";
import TaskModal from "@/components/task-modal";
import { CREATE_TASK } from "@/graphql/mutations/task";
import { resetTask } from "@/stores/task.slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";

export const Route = createFileRoute("/tasks/")({
  component: RouteComponent,
});

type GetInitialDataResult = {
  todoColumn: Task[];
  progressColumn: Task[];
  reviewColumn: Task[];
  doneColumn: Task[];
};

function RouteComponent() {
  const { data, loading } = useQuery<GetInitialDataResult>(GET_INITIAL_DATA);
  const [addTask, { loading: addTaskLoading }] = useMutation<
    CreateTaskResponse,
    CreateTaskVariables
  >(CREATE_TASK, {
    refetchQueries: [{ query: GET_INITIAL_DATA }],
    awaitRefetchQueries: true,
  });
  const dispatch = useAppDispatch();
  const { title, description, priority, deadline } = useAppSelector(
    (state) => state.task,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const serverTasks: Task[] = data
    ? [
        ...data.todoColumn,
        ...data.progressColumn,
        ...data.reviewColumn,
        ...data.doneColumn,
      ]
    : [];

  const [localOverrides, setLocalOverrides] = useState<
    Record<string, TaskStatus>
  >({});

  const tasks: Task[] = serverTasks.map((t) =>
    localOverrides[t.id] ? { ...t, status: localOverrides[t.id] } : t,
  );

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const filteredTasks = search.trim()
    ? tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    : tasks;

  const columns: KanbanColumn[] = COLUMN_DEFS.map((col) => ({
    ...col,
    tasks: filteredTasks.filter((t) => t.status === col.id),
  }));

  const findColumn = (id: string): TaskStatus | null => {
    const task = tasks.find((t) => t.id === id);
    if (task) return task.status;
    if (COLUMN_DEFS.some((c) => c.id === id)) return id as TaskStatus;
    return null;
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task ?? null);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const activeColId = findColumn(activeId);
    const overColId = findColumn(overId);
    if (!activeColId || !overColId || activeColId === overColId) return;

    setLocalOverrides((prev) => ({ ...prev, [activeId]: overColId }));
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const overIndex = tasks.findIndex((t) => t.id === overId);
    if (overIndex === -1) return;
  };

  const activeColumnDef = activeTask
    ? COLUMN_DEFS.find((c) => c.id === activeTask.status)
    : null;

  return (
    <AuthenticatedLayout>
      {loading ? (
        <GlobalLoading />
      ) : (
        <>
          <div className="flex flex-col h-full bg-[#0d1117] px-6 py-3">
            <div className="flex items-center gap-4 mb-4">
              <Input
                prefix={<IconSearch />}
                placeholder="Filter by title..."
                value={search}
                onChange={(e) => setSearch(e)}
              />
              <Button onClick={() => setIsModalOpen(true)} icon={<IconPlus />}>
                Add task
              </Button>
            </div>

            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
            >
              <div className="flex gap-4 flex-1 min-h-0">
                {columns.map((col) => (
                  <KanbanColumnComponent key={col.id} column={col} />
                ))}
              </div>

              <DragOverlay>
                {activeTask && activeColumnDef ? (
                  <div className="rotate-2 shadow-2xl">
                    <KanbanCard
                      task={activeTask}
                      columnColor={activeColumnDef.color}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
          <TaskModal
            loading={addTaskLoading}
            close={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            submit={async () => {
              try {
                await addTask({
                  variables: {
                    data: {
                      title,
                      description,
                      priority,
                      deadline,
                    },
                  },
                });
                dispatch(resetTask());
                setIsModalOpen(false);
                Notification.success({
                  title: "Task Created",
                  content: "The task has been created successfully.",
                  duration: 5000,
                  theme: "light",
                });
              } catch {
                Notification.error({
                  title: "Task Creation Failed",
                  content: "Failed to add task. Please try again.",
                  duration: 5000,
                  theme: "light",
                });
              }
            }}
          />
        </>
      )}
    </AuthenticatedLayout>
  );
}

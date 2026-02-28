import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task, TaskPriority } from "@/types/task";
import {
  IconAlertTriangle,
  IconArchive,
  IconClock,
  IconDelete,
  IconMore,
} from "@douyinfe/semi-icons";
import { PRIORITY_CONFIG } from "@/data/task";
import { formatTime } from "@/utils/time";
import { Button, Dropdown } from "@douyinfe/semi-ui-19";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import {
  handleSelectTask,
  openArchivedTaskModal,
  openDeleteTaskModal,
  openDetailSideSheet,
} from "@/stores/task.slice";
import { useState } from "react";

type KanbanCardProps = {
  task: Task;
};

export default function KanbanCard({ task }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priority = task.priority as TaskPriority | undefined;
  const priorityCfg = priority ? PRIORITY_CONFIG[priority] : null;
  const deadline = task.deadline ? formatTime(task.deadline) : null;
  const isOverdue = task.deadline
    ? new Date(task.deadline).getTime() < new Date().getTime()
    : false;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-[#1a1f2e] border rounded-lg p-3 cursor-grab active:cursor-grabbing select-none transition-colors ${
        deadline && task.status !== "DONE"
          ? isOverdue
            ? "border-red-500/50"
            : "border-amber-500/50"
          : "border-[#2a2f3e]"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        {priorityCfg && (
          <span
            className="flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full"
            style={{
              color: priorityCfg.color,
              backgroundColor: priorityCfg.bg,
            }}
          >
            {priority === "HIGH" && <IconAlertTriangle size="extra-small" />}
            {priorityCfg.label}
          </span>
        )}
        <Dropdown
          trigger="click"
          position="bottomRight"
          visible={isDropdownOpen}
          render={
            <Dropdown.Menu>
              <Dropdown.Item
                icon={<IconArchive />}
                onClick={() => {
                  dispatch(handleSelectTask(task.id));
                  dispatch(openArchivedTaskModal());
                  setIsDropdownOpen(false);
                }}
              >
                Archived
              </Dropdown.Item>
              <Dropdown.Item
                type="danger"
                icon={<IconDelete />}
                onClick={() => {
                  dispatch(handleSelectTask(task.id));
                  dispatch(openDeleteTaskModal());
                  setIsDropdownOpen(false);
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <span style={{ display: "inline-block" }}>
            <Button
              icon={<IconMore />}
              type="tertiary"
              theme="borderless"
              style={{ padding: 8, width: 20, height: 20 }}
              onClick={() => {
                setIsDropdownOpen(true);
              }}
            />
          </span>
        </Dropdown>
      </div>

      {/* Title */}
      <p
        onClick={() => {
          dispatch(handleSelectTask(task.id));
          dispatch(openDetailSideSheet());
        }}
        className="text-sm text-gray-100 leading-snug mb-2 font-bold hover:underline cursor-pointer"
      >
        {task.title}
      </p>

      {/* Deadline footer */}
      {deadline ? (
        <div
          className={`flex items-center gap-1 text-xs font-medium mt-1 ${
            deadline && task.status !== "DONE"
              ? isOverdue
                ? "text-red-400"
                : "text-amber-400"
              : "text-gray-400"
          }`}
        >
          <IconClock size="extra-small" />
          <span>{deadline}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
          <IconClock size="extra-small" />
          <span>No deadline</span>
        </div>
      )}
    </div>
  );
}

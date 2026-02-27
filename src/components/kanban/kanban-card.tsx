import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/task";

type KanbanCardProps = {
  task: Task;
  columnColor: string;
};

export default function KanbanCard({ task, columnColor }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#1a1f2e] border border-[#2a2f3e] rounded-lg p-3 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Source label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: columnColor }}
          />
          <span className="text-xs text-gray-400 font-mono">{task.id}</span>
        </div>
      </div>

      {/* Title */}
      <p className="text-sm text-gray-100 leading-snug">{task.title}</p>
    </div>
  );
}

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { KanbanColumn as KanbanColumnType } from "@/types/task";
import KanbanCard from "./kanban-card";

type KanbanColumnProps = {
  column: KanbanColumnType;
};

export default function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0 border border-[#2a2f3e] rounded-lg bg-[#1a1f2e] p-4">
      {/* Column header */}
      <div className="flex items-start justify-between mb-3 px-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: column.color }}
            />
            <span className="text-sm font-semibold text-gray-100">
              {column.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 pl-5">{column.description}</p>
        </div>
        <button className="text-gray-500 hover:text-gray-300 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="3" cy="8" r="1.2" />
            <circle cx="8" cy="8" r="1.2" />
            <circle cx="13" cy="8" r="1.2" />
          </svg>
        </button>
      </div>

      {/* Cards droppable area */}
      <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`flex flex-col gap-2 flex-1 overflow-y-auto min-h-16 rounded-lg p-1 transition-colors ${
            isOver ? "bg-white/5" : ""
          }`}
        >
          {column.tasks.map((task) => (
            <KanbanCard key={task.id} task={task} columnColor={column.color} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

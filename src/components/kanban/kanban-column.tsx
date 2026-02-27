import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { KanbanColumn as KanbanColumnType } from "@/types/task";
import KanbanCard from "./kanban-card";
import { Dropdown } from "@douyinfe/semi-ui-19";
import {
  IconArchive,
  IconDelete,
  IconFilter,
  IconMore,
  IconSort,
} from "@douyinfe/semi-icons";

type KanbanColumnProps = {
  handleArchiveTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  isDeleteLoading: boolean;
  isArchiveLoading: boolean;
  column: KanbanColumnType;
};

function SortSubDropdown() {
  return (
    <Dropdown.Menu>
      <Dropdown.Item>1</Dropdown.Item>
    </Dropdown.Menu>
  );
}

function FilterSubDropdown() {
  return (
    <Dropdown.Menu>
      <Dropdown.Item></Dropdown.Item>
    </Dropdown.Menu>
  );
}
export default function KanbanColumn({
  column,
  handleArchiveTask,
  handleDeleteTask,
  isDeleteLoading,
  isArchiveLoading,
}: KanbanColumnProps) {
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
        <Dropdown
          position="bottomRight"
          trigger="click"
          render={
            <Dropdown.Menu>
              <Dropdown.Title>Columns</Dropdown.Title>
              <Dropdown
                trigger="click"
                render={<SortSubDropdown />}
              >
                <Dropdown.Item icon={<IconSort />}>
                  <span>Sort by</span>
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                trigger="click"
                render={<FilterSubDropdown />}
              >
                <Dropdown.Item icon={<IconFilter />}>
                  <span>Filter by</span>
                </Dropdown.Item>
              </Dropdown>
              <Dropdown.Divider />
              <Dropdown.Title>Items</Dropdown.Title>
              <Dropdown.Item icon={<IconArchive />}>Archived all</Dropdown.Item>
              <Dropdown.Item
                type="danger"
                icon={<IconDelete />}
                onClick={async () => {}}
              >
                Delete all
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconMore
            style={{ color: "var(--semi-color-text-2)" }}
            className="w-4.5 h-4.5 rounded cursor-pointer hover:bg-[#2a2f3e] transition-colors"
          />
        </Dropdown>
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
            <KanbanCard
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              isDeleteLoading={isDeleteLoading}
              isArchiveLoading={isArchiveLoading}
              onArchive={() => handleArchiveTask(task.id)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

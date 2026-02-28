import { GET_TASK_DETAIL } from "@/graphql/queries/task";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeDetailSideSheet, openArchivedTaskModal, openDeleteTaskModal } from "@/stores/task.slice";
import type {
  GetTaskDetailResponse,
  TaskIdVariable,
  TaskPriority,
} from "@/types/task";
import { formatTime } from "@/utils/time";
import { COLUMN_DEFS, PRIORITY_CONFIG } from "@/data/task";
import { useQuery } from "@apollo/client/react";
import {
  Button,
  MarkdownRender,
  SideSheet,
  Skeleton,
  Tag,
  Tooltip,
} from "@douyinfe/semi-ui-19";
import {
  IconAlertTriangle,
  IconArchive,
  IconCalendar,
  IconClock,
  IconDelete,
  IconEdit,
  IconHelpCircle,
} from "@douyinfe/semi-icons";

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[#2a2f3e] last:border-0">
      <span className="mt-0.5 text-gray-500 shrink-0">{icon}</span>
      <span className="text-xs text-gray-400 font-bold w-24 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-gray-100 flex-1">{children}</span>
    </div>
  );
}

export default function KanbanSideSheet() {
  const { isOpenDetailSideSheet: isOpen, currentTaskId: taskId } =
    useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const { data: taskDetail, loading } = useQuery<
    GetTaskDetailResponse,
    TaskIdVariable
  >(GET_TASK_DETAIL, {
    variables: { id: taskId || "" },
    skip: !taskId,
  });

  const task = taskDetail?.getTaskById;
  const priorityCfg = task?.priority
    ? PRIORITY_CONFIG[task.priority as TaskPriority]
    : null;
  const columnDef = task?.status
    ? COLUMN_DEFS.find((c) => c.id === task.status)
    : null;
  const deadline = task?.deadline ? formatTime(task.deadline) : null;
  const isOverdue = task?.deadline
    ? new Date(task.deadline).getTime() < new Date().getTime()
    : false;

  return (
    <SideSheet
      title={
        loading ? (
          <Skeleton.Title />
        ) : (
          <span className="flex items-center justify-between -mt-1">
            <p>{task?.title || "Task Detail"}</p>
            <div className="flex items-center gap-2 mr-4">
              <Tooltip
                content="Edit Task"
                position="bottom"
                className="cursor-pointer"
              >
                <span style={{ display: "inline-block" }}>
                  <Button
                    icon={<IconEdit />}
                    type="tertiary"
                    theme="borderless"
                  ></Button>
                </span>
              </Tooltip>
              <Tooltip
                content="Archive Task"
                position="bottom"
                className="cursor-pointer"
              >
                <span style={{ display: "inline-block" }}>
                  <Button
                    icon={<IconArchive />}
                    type="tertiary"
                    theme="borderless"
                    onClick={() => {
                      dispatch(openArchivedTaskModal());
                      dispatch(closeDetailSideSheet());
                    }}
                  ></Button>
                </span>
              </Tooltip>
              <Tooltip
                content="Delete Task"
                position="bottom"
                className="cursor-pointer"
              >
                <span style={{ display: "inline-block" }}>
                  <Button
                    icon={<IconDelete />}
                    type="danger"
                    theme="borderless"
                    onClick={() => {
                      dispatch(openDeleteTaskModal());
                      dispatch(closeDetailSideSheet());
                    }}
                  ></Button>
                </span>
              </Tooltip>
            </div>
          </span>
        )
      }
      visible={isOpen}
      onCancel={() => {
        dispatch(closeDetailSideSheet());
      }}
      size="medium"
    >
      {loading ? (
        <div className="space-y-6">
          <div className="mb-2">
            <Skeleton.Title />
            <Skeleton.Paragraph rows={5} />
          </div>
          <div>
            <Skeleton.Title />
            <Skeleton.Paragraph rows={3} />
          </div>
        </div>
      ) : !task ? (
        <div className="flex flex-col items-center gap-2 py-16 text-gray-500">
          <IconHelpCircle size="extra-large" />
          <p className="text-sm">Task not found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Metadata grid */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              General Information
            </h2>
            <div className="rounded-lg border border-[#2a2f3e] bg-[#13172200] px-4 py-1 divide-y divide-[#2a2f3e]">
              {/* Status */}
              <InfoRow
                icon={
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: columnDef?.color ?? "#6b7280" }}
                  />
                }
                label="Status"
              >
                <Tag
                  style={{
                    color: columnDef?.color,
                    backgroundColor: `${columnDef?.color}1a`,
                    border: `1px solid ${columnDef?.color}40`,
                  }}
                  size="small"
                >
                  {columnDef?.label ?? task.status}
                </Tag>
              </InfoRow>

              {/* Priority */}
              <InfoRow
                icon={
                  task.priority === "HIGH" ? (
                    <IconAlertTriangle
                      size="small"
                      style={{ color: priorityCfg?.color }}
                    />
                  ) : (
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block"
                      style={{
                        backgroundColor: priorityCfg?.color ?? "#6b7280",
                      }}
                    />
                  )
                }
                label="Priority"
              >
                {priorityCfg ? (
                  <Tag
                    style={{
                      color: priorityCfg.color,
                      backgroundColor: priorityCfg.bg,
                      border: `1px solid ${priorityCfg.color}40`,
                    }}
                    size="small"
                  >
                    {priorityCfg.label}
                  </Tag>
                ) : (
                  <span className="text-gray-500 italic">Not set</span>
                )}
              </InfoRow>

              {/* Deadline */}
              <InfoRow icon={<IconCalendar size="small" />} label="Deadline">
                {deadline ? (
                  <span
                    className={`font-medium ${
                      isOverdue ? "text-red-400" : "text-amber-400"
                    }`}
                  >
                    {isOverdue && (
                      <IconClock
                        size="extra-small"
                        className="inline mr-1 -mt-0.5"
                      />
                    )}
                    {deadline}
                    {isOverdue && (
                      <span className="ml-1.5 text-xs text-red-400/70">
                        (overdue)
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-gray-500 italic">No deadline</span>
                )}
              </InfoRow>

              {/* Created at */}
              <InfoRow icon={<IconClock size="small" />} label="Created at">
                {formatTime(task.createdAt) ?? (
                  <span className="text-gray-500 italic">Unknown</span>
                )}
              </InfoRow>

              {/* Updated at */}
              <InfoRow
                icon={<IconClock size="small" />}
                label="Last updated at"
              >
                {formatTime(task.updatedAt) ?? (
                  <span className="text-gray-500 italic">Unknown</span>
                )}
              </InfoRow>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Description
            </h2>
            {task.description ? (
              <MarkdownRender raw={task.description} />
            ) : (
              <div className="rounded-lg border border-dashed border-[#2a2f3e] p-6 flex items-center justify-center">
                <Tooltip content="Add a description via the edit task dialog">
                  <span className="text-sm text-gray-500 italic cursor-default">
                    No description provided.
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      )}
    </SideSheet>
  );
}

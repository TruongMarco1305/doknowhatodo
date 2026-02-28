import { ARCHIVED_TASK } from "@/graphql/mutations/task";
import { GET_INITIAL_DATA } from "@/graphql/queries/task";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeArchivedTaskModal } from "@/stores/task.slice";
import type { ArchivedTaskResponse, TaskIdVariable } from "@/types/task";
import { useMutation } from "@apollo/client/react";
import { Button, Modal, Notification } from "@douyinfe/semi-ui-19";

export default function ArchivedTaskModal() {
  const { isOpenArchivedTaskModal, currentTaskId } = useAppSelector(
    (state) => state.task,
  );
  const dispatch = useAppDispatch();
  const [archivedTask, { loading: archiveLoading }] = useMutation<
    ArchivedTaskResponse,
    TaskIdVariable
  >(ARCHIVED_TASK, {
    refetchQueries: [{ query: GET_INITIAL_DATA }],
    awaitRefetchQueries: true,
  });
  const handleArchiveTask = async (id: string) => {
    try {
      await archivedTask({ variables: { id } });
      Notification.success({
        title: "Task Archived",
        content: "The task has been archived successfully.",
        duration: 5,
        theme: "light",
      });
    } catch {
      Notification.error({
        title: "Task Archiving Failed",
        content: "Failed to archive task. Please try again.",
        duration: 5,
        theme: "light",
      });
    } finally {
      dispatch(closeArchivedTaskModal());
    }
  };
  return (
    <Modal
      title="Archive Task?"
      visible={isOpenArchivedTaskModal}
      onCancel={() => {
        dispatch(closeArchivedTaskModal());
      }}
      size="small"
      footer={
        <Button
          type="primary"
          onClick={() => {
            if (currentTaskId) {
              handleArchiveTask(currentTaskId);
            }
          }}
          disabled={archiveLoading}
        >
          Confirm
        </Button>
      }
    >
      <p>
        Are you sure you want to archive this task? You can find archived tasks
        in the "Archived" section.
      </p>
    </Modal>
  );
}

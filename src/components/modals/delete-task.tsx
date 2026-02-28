import { DELETE_TASK } from "@/graphql/mutations/task";
import { GET_INITIAL_DATA } from "@/graphql/queries/task";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeDeleteTaskModal } from "@/stores/task.slice";
import type { ArchivedTaskResponse, TaskIdVariable } from "@/types/task";
import { useMutation } from "@apollo/client/react";
import { Button, Modal, Notification } from "@douyinfe/semi-ui-19";

export default function DeleteTaskModal() {
  const { isOpenDeleteTaskModal, currentTaskId } = useAppSelector(
    (state) => state.task,
  );
  const dispatch = useAppDispatch();
  const [deleteTask, { loading: deleteLoading }] = useMutation<
    ArchivedTaskResponse,
    TaskIdVariable
  >(DELETE_TASK, {
    refetchQueries: [{ query: GET_INITIAL_DATA }],
    awaitRefetchQueries: true,
  });

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      Notification.success({
        title: "Task Deleted",
        content: "The task has been deleted successfully.",
        duration: 5,
        theme: "light",
      });
    } catch {
      Notification.error({
        title: "Task Deletion Failed",
        content: "Failed to delete task. Please try again.",
        duration: 5,
        theme: "light",
      });
    } finally {
      dispatch(closeDeleteTaskModal());
    }
  };

  return (
    <Modal
      title="Delete Task?"
      visible={isOpenDeleteTaskModal}
      onCancel={() => {
        dispatch(closeDeleteTaskModal());
      }}
      size="small"
      footer={
        <Button
          type="danger"
          onClick={() => {
            if (currentTaskId) {
              handleDeleteTask(currentTaskId);
            }
          }}
          disabled={deleteLoading}
        >
          Confirm
        </Button>
      }
    >
      <p>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
    </Modal>
  );
}

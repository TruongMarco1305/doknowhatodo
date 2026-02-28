import { ARCHIVED_TASK } from "@/graphql/mutations/task";
import { GET_INITIAL_DATA } from "@/graphql/queries/task";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeArchivedTaskModal } from "@/stores/task.slice";
import type { ArchivedTaskResponse, TaskIdVariable } from "@/types/task";
import { useMutation } from "@apollo/client/react";
import { Button, Modal } from "@douyinfe/semi-ui-19";

export default function ArchivedTaskModal() {
  const { isOpenArchivedTaskModal, currentTaskId } = useAppSelector(
    (state) => state.task,
  );
  const dispatch = useAppDispatch();
  const [restoreTask, { loading: restoreLoading }] = useMutation<
    ArchivedTaskResponse,
    TaskIdVariable
  >(ARCHIVED_TASK, {
    refetchQueries: [{ query: GET_INITIAL_DATA }],
    awaitRefetchQueries: true,
  });
  return (
    <Modal
      title="Restore Task?"
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
              restoreTask({ variables: { id: currentTaskId } });
            }
          }}
          disabled={restoreLoading}
        >
          Confirm
        </Button>
      }
    >
      <p>
        Are you sure you want to restore this task? You can find restored tasks
        in the "Active" section.
      </p>
    </Modal>
  );
}

import {
  DatePicker,
  Input,
  MarkdownRender,
  Switch,
  TextArea,
  Modal,
  Button,
  Select,
} from "@douyinfe/semi-ui-19";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import {
  updateDeadline,
  updateDescription,
  updateIsPreviewMarkdown,
  updatePriority,
  updateTitle,
} from "@/stores/task.slice";
import { useAppSelector } from "@/hooks/use-app-selector";
import { formatTime } from "@/utils/time";

type CreateTaskModalProps = {
  isOpen: boolean;
  loading: boolean;
  close: () => void;
  submit: () => void;
};

export default function CreateTaskModal({ isOpen, close, submit, loading }: CreateTaskModalProps) {
  const dispatch = useAppDispatch();
  const { title, description, isPreviewMarkdown, deadline, priority } = useAppSelector(
    (state) => state.task
  );
  return (
    <Modal
      title="Create Task"
      visible={isOpen}
      onCancel={close}
      size="large"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Select
            placeholder="Select priority"
            onChange={(value) => dispatch(updatePriority(value))}
            className="w-fit"
            disabled={loading}
            value={priority}
          >
            <Select.Option value="LOW">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Low
              </span>
            </Select.Option>
            <Select.Option value="MEDIUM">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Medium
              </span>
            </Select.Option>
            <Select.Option value="HIGH">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                High
              </span>
            </Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={submit}
            disabled={loading}
          >
            Confirm
          </Button>
        </div>
      }
    >
      <h1 className="font-bold mb-2">Add a title</h1>
      <Input
        placeholder="Type task's title"
        onChange={(e) => dispatch(updateTitle(e))}
        className="mb-3 border border-[#2a2f3e] bg-[#1a1f2e] focus:border-[#2a2f3e] focus:ring-0"
        disabled={loading}
        value={title}
      />

      <div className="flex items-center justify-between mb-2">
        <h1 className="font-bold">Add a description</h1>
        <div className="flex items-center gap-2">
          <span className="font-bold">Preview Markdown</span>
          <Switch
            onChange={(checked) => dispatch(updateIsPreviewMarkdown(checked))}
            disabled={loading}
          ></Switch>
        </div>
      </div>
      {isPreviewMarkdown ? (
        <MarkdownRender raw={description} className="bg-transparent" />
      ) : (
        <TextArea
          autosize
          placeholder="Type task's description"
          onChange={(e) => dispatch(updateDescription(e))}
          className="border border-[#2a2f3e] bg-[#1a1f2e] focus:border-[#2a2f3e] focus:ring-0"
          disabled={loading}
          value={description}
        />
      )}
      <h1 className="font-bold mt-3">Add a deadline</h1>
      <div className="mt-2 flex items-center gap-2">
        <DatePicker
          type="dateTime"
          needConfirm={true}
          onConfirm={(date) => {
            dispatch(updateDeadline((date as Date).toISOString().slice(0, 19)));
          }}
          value={deadline ? new Date(deadline) : undefined}
          disabled={loading}
        />
        {deadline && (
          <Button
            type="danger"
            onClick={() => dispatch(updateDeadline(undefined))}
            disabled={loading}
          >
            Clear
          </Button>
        )}
      </div>
      {deadline && <h1 className="italic mt-2">Deadline: {formatTime(deadline)}</h1>}
    </Modal>
  );
}

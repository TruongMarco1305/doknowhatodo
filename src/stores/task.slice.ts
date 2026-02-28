import type { TaskPriority } from "@/types/task";
import { createSlice } from "@reduxjs/toolkit";

export type TaskSlice = {
  title: string;
  description: string;
  priority: TaskPriority;
  deadline?: string;
  isPreviewMarkdown: boolean;
  isOpenDetailSideSheet: boolean;
  isOpenArchivedTaskModal: boolean;
  isOpenDeleteTaskModal: boolean;
  currentTaskId?: string;
};

const initialState: TaskSlice = {
  title: "",
  description: "",
  priority: "LOW",
  deadline: undefined,
  isPreviewMarkdown: false,
  isOpenDetailSideSheet: false,
  isOpenArchivedTaskModal: false,
  isOpenDeleteTaskModal: false,
  currentTaskId: undefined,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handleSelectTask: (state, action) => {
      state.currentTaskId = action.payload;
    },
    openDetailSideSheet: (state) => {
      state.isOpenDetailSideSheet = true;
    },
    closeDetailSideSheet: (state) => {
      state.isOpenDetailSideSheet = false;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updatePriority: (state, action) => {
      state.priority = action.payload;
    },
    updateDeadline: (state, action) => {
      state.deadline = action.payload;
    },
    updateIsPreviewMarkdown: (state, action) => {
      state.isPreviewMarkdown = action.payload;
    },
    openArchivedTaskModal: (state) => {
      state.isOpenArchivedTaskModal = true;
    },
    closeArchivedTaskModal: (state) => {
      state.isOpenArchivedTaskModal = false;
    },
    openDeleteTaskModal: (state) => {
      state.isOpenDeleteTaskModal = true;
    },
    closeDeleteTaskModal: (state) => {
      state.isOpenDeleteTaskModal = false;
    },
    resetTask: (state) => {
      state.title = "";
      state.description = "";
      state.priority = "LOW";
      state.deadline = undefined;
      state.isPreviewMarkdown = false;
    },
  },
});
export const {
  updateTitle,
  updateDescription,
  updatePriority,
  updateDeadline,
  updateIsPreviewMarkdown,
  resetTask,
  openDetailSideSheet,
  closeDetailSideSheet,
  handleSelectTask,
  openArchivedTaskModal,
  closeArchivedTaskModal,
  openDeleteTaskModal,
  closeDeleteTaskModal,
} = taskSlice.actions;
export default taskSlice.reducer;

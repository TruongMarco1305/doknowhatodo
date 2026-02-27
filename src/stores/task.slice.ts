import type { TaskPriority } from "@/types/task";
import { createSlice } from "@reduxjs/toolkit";

export type TaskSlice = {
  title: string;
  description: string;
  priority: TaskPriority;
  deadline?: string;
  isPreviewMarkdown: boolean;
};

const initialState: TaskSlice = {
  title: "",
  description: "",
  priority: "LOW",
  deadline: undefined,
  isPreviewMarkdown: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
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
} = taskSlice.actions;
export default taskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export type UserSlice = {
  isOpenUserGuide: boolean
};

const initialState: UserSlice = {
  isOpenUserGuide: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openUserGuide: state => {
        state.isOpenUserGuide = true;
    },
    closeUserGuide: state => {
        state.isOpenUserGuide = false;
    },
  },
})
export const { openUserGuide, closeUserGuide } = userSlice.actions;
export default userSlice.reducer
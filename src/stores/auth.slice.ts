import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { User } from "@/types/user";

export type AuthSlice = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: AuthSlice = {
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated: state => {
        state.isAuthenticated = true;
    },
    logout: state => {
        state.isAuthenticated = false;
        state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
    }
  },
})
export const { authenticated, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer
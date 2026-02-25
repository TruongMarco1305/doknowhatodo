import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
    setUser: (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
    }
  },
})
export const { authenticated, logout, setUser } = authSlice.actions;
export default authSlice.reducer
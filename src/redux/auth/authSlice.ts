import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    savetoken(state, { payload }: PayloadAction) {
      if (payload) {
        state.token = payload;
      }
    },
    cleartoken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction) {
      state.isAuthenticated = payload;
    },
  },
});

export const { savetoken, cleartoken, setAuthState } = auth.actions;
export default auth.reducer;


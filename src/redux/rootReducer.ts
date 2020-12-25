import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import diariesReducer from './diary/diarySlice';
import entriesReducer from './entry/entrySlice';
import userReducer from './user/userSlice';
import editorReducer from './entry/editorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
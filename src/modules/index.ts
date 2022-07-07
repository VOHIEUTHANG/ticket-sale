import { combineReducers } from '@reduxjs/toolkit';

import profileStore from './authentication/profileStore';
import settingStore from './setting/settingStore';

const appReducer = combineReducers({
  profile: profileStore.reducer,
  settingStore: settingStore.reducer,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;

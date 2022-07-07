import { Locale } from '@locale/index';
import { RootState } from '@modules';
import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';

interface IStore {
  language: string;
}

const settingStore = createSlice({
  name: 'settingStore',
  initialState: {
    language: 'vi',
  } as IStore,
  reducers: {
    updateLanguage: (state, action: PayloadAction<keyof Locale>) =>
      Object.assign(state, { language: action.payload }),
  },
});

interface ILang {
  language: string;
}
export const LanguageSelector: Selector<RootState, ILang> = state => {
  return {
    language: state.settingStore.language,
  };
};

export default settingStore;

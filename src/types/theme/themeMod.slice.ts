import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

export enum ThemeModEnum {
  LIGHT = 'light',
  DARK = 'dark',
}
export const defaultMode = Appearance.getColorScheme() || ThemeModEnum.LIGHT;

const themeModelsSlice = createSlice({
  name: 'themeMode',
  initialState: {
    themeMode: defaultMode as ThemeModEnum,
  },
  reducers: {
    setThemeMod: (state, action: {payload: ThemeModEnum}) => {
      state.themeMode = action.payload;
    },
  },
});

export const {setThemeMod} = themeModelsSlice.actions;

export default themeModelsSlice.reducer;

import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../store/reducers/rootReduser';

export const getThemeMod = createSelector(
  (state: RootState) => state,
  state => state.themeMode,
);

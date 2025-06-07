import type { RootState } from '../types';

export const selectTheme = (state: RootState) => state.theme.mode;

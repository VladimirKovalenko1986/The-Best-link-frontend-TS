import type { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectUser = (state: RootState) => state.auth.user;

export const selectLoadingRegistration = (state: RootState) =>
  state.auth.loading.registration;
export const selectLoadingLogin = (state: RootState) =>
  state.auth.loading.login;
export const selectLoadingLogout = (state: RootState) =>
  state.auth.loading.logout;
export const selectLoadingResetPassword = (state: RootState) =>
  state.auth.loading.resetPassword;
export const selectLoadingRegistrationGoogle = (state: RootState) =>
  state.auth.loading.registrationGoogle;

export const selectError = (state: RootState) => state.auth.error;
export const selectMessage = (state: RootState) => state.auth.message;
export const selectToken = (state: RootState) => state.auth.token;

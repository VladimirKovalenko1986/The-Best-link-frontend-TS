export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectUser = (state) => state.auth.user;

export const selectLoadingRegistration = (state) =>
  state.auth.loading.registration;

export const selectLoadingLogout = (state) => state.auth.loading.logout;

export const selectLoadingResetPassword = (state) =>
  state.auth.loading.resetPassword;

export const selectLoadingLogin = (state) => state.auth.loading.login;

export const selectLoadingregistrationGoogle = (state) =>
  state.auth.loading.registrationGoogle;

export const selectError = (state) => state.auth.error;

export const selectMessage = (state) => state.auth.message;

export const selectResetPassword = (state) => state.auth.resetPassword;

export const selectPassword = (state) => state.auth.password;

export const selectToken = (state) => state.auth.token;

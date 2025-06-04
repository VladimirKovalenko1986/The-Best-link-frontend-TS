import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  logIn,
  logOut,
  refreshUser,
  registration,
  sendEmailResetPassword,
  resetPassword,
  fetchGoogleOAuthUrl,
  loginWithGoogle,
} from './operations.ts';
import type { RegistrationResponse } from './auth.type.ts';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null as string | null,
      email: null as string | null,
      photo: null as string | null,
    },
    token: null as string | null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: {
      registration: false,
      login: false,
      logout: false,
      registrationGoogle: false,
      resetPassword: false,
    },
    error: null as string | null,
    message: '',
  },
  reducers: {
    clearMessage: state => {
      state.message = '';
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registration.pending, state => {
        state.loading.registration = true;
        state.error = null;
      })
      .addCase(
        registration.fulfilled,
        (state, action: PayloadAction<RegistrationResponse>): void => {
          state.user = action.payload.data.user;
          state.token = action.payload.data.accessToken || null;
          state.isLoggedIn = true;
          state.loading.registration = false;
        }
      )
      .addCase(
        registration.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Unknown error';
          state.loading.registration = false;
        }
      )
      .addCase(logIn.pending, state => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.loading.login = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.login = false;
      })
      .addCase(logOut.pending, state => {
        state.loading.logout = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: '', email: '', photo: '' };
        state.token = null;
        state.isLoggedIn = false;
        state.loading.logout = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.logout = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.user = { name: '', email: '', photo: '' };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(sendEmailResetPassword.pending, state => {
        state.loading.resetPassword = true;
        state.error = null;
        state.message = '';
      })
      .addCase(sendEmailResetPassword.fulfilled, state => {
        state.loading.resetPassword = false;
        state.message =
          'If this email is registered, you will receive reset instructions.';
      })
      .addCase(sendEmailResetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.resetPassword = false;
        state.message = '';
      })
      .addCase(resetPassword.pending, state => {
        state.loading.resetPassword = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading.resetPassword = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.resetPassword = false;
      })
      .addCase(fetchGoogleOAuthUrl.pending, state => {
        state.loading.registrationGoogle = true;
        state.error = null;
      })
      .addCase(fetchGoogleOAuthUrl.fulfilled, state => {
        state.loading.registrationGoogle = false;
      })
      .addCase(fetchGoogleOAuthUrl.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.registrationGoogle = false;
      })
      .addCase(loginWithGoogle.pending, state => {
        state.loading.registrationGoogle = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload?.user || { name: '', email: '', photo: '' };
        state.token = action.payload?.accessToken;
        state.isLoggedIn = true;
        state.loading.registrationGoogle = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.registrationGoogle = false;
      }),
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;

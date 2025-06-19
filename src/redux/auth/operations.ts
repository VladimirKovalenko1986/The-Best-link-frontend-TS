import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  ResponseUser,
  LoginDto,
  UserDto,
  GoogleLoginResponse,
} from './auth.type';
import type { RootState } from '../types';

axios.defaults.baseURL = 'https://the-best-link-backend.onrender.com';
axios.defaults.withCredentials = true;

export const setAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const clearAuthHeader = (): void => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const registration = createAsyncThunk<
  ResponseUser,
  UserDto,
  { rejectValue: string }
>('auth/register', async (userData, thunkAPI) => {
  try {
    // 1. Create FormData
    const formData = new FormData();

    // 2. Add form (text)
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    // 3. If is file, add him
    if (userData.photo) {
      formData.append('photo', userData.photo);
    }

    // 4. Send multipart/form-data on the backend
    const response = await axios.post<ResponseUser>(
      '/auth/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Registration failed'
    );
  }
});

export const logIn = createAsyncThunk<
  ResponseUser,
  LoginDto,
  { rejectValue: string }
>('auth/login', async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', userInfo);

    setAuthHeader(response.data.data.accessToken);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Login failed'
    );
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/auth/logout');

      clearAuthHeader();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err.response?.data.message || 'Logout failed'
      );
    }
  }
);

export const refreshUser = createAsyncThunk<
  ResponseUser,
  void,
  { state: RootState; rejectValue: string }
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;

    if (!savedToken) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      // ✅ Setup old token from request update session
      setAuthHeader(savedToken);

      const response = await axios.post('/auth/refresh');

      const newAccessToken = response.data.data.accessToken;

      // ✅ Update `Authorization` header
      setAuthHeader(newAccessToken);

      return response.data;
    } catch (error) {
      // ❌ If token is broken - delete him
      clearAuthHeader();
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err.response?.data.message || 'Session expired'
      );
    }
  },

  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
      return !!savedToken; // Return `null` in `false`
    },
  }
);

export const sendEmailResetPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>('auth/request-reset-email', async ({ email }, thunkAPI) => {
  try {
    const response = await axios.post('/auth/request-reset-email', { email });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Reset request failed'
    );
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { token: string | null; password: string },
  { rejectValue: string }
>('auth/reset-password', async ({ token, password }, thunkAPI) => {
  try {
    const response = await axios.post('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Reset password'
    );
  }
});

export const fetchGoogleOAuthUrl = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>('auth/get-oauth-url', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/auth/get-oauth-url');
    console.log(response.data.data.url);
    return response.data.data.url;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Failed to fetch Google OAuth URL'
    );
  }
});

export const loginWithGoogle = createAsyncThunk<
  GoogleLoginResponse,
  string,
  { rejectValue: string }
>('auth/confirm-oauth', async (code, thunkAPI) => {
  try {
    const response = await axios.post('/auth/confirm-oauth', { code });

    console.log('Google login response:', response.data);

    // ✅ Переконайся, що дані отримуються правильно
    const user = response.data?.data?.user;
    const accessToken = response.data?.data?.accessToken;

    if (!user || !accessToken) {
      throw new Error('Invalid user data from Google login');
    }

    setAuthHeader(accessToken);

    return { user, accessToken };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Google login failed'
    );
  }
});

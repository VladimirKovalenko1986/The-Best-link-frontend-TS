import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { refreshUser } from '../auth/operations.ts';
import type {
  FetchLinksParams,
  FetchLinksResponse,
  Link,
  EditLinkParams,
  LinkEdit,
  EditLinkResponse,
} from './links.type.ts';
import type { RootState } from '../types.ts';

axios.defaults.baseURL = 'https://the-best-link-backend.onrender.com';
axios.defaults.withCredentials = true;

export const fetchLinks = createAsyncThunk<
  FetchLinksResponse,
  FetchLinksParams,
  { rejectValue: string }
>('fetchLinks', async ({ page = 1, limit = 10, filter = '' }, thunkAPI) => {
  try {
    const response = await axios.get(`/links`, {
      params: { page, limit, nameType: filter },
    });
    console.log(response.data.data.data, response.data.data.hasNextPage);
    return {
      data: response.data.data.data,
      hasNextPage: response.data.data.hasNextPage,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Fetch all links'
    );
  }
});

export const addLink = createAsyncThunk<
  Link,
  LinkEdit,
  { state: RootState; rejectValue: string }
>('addLink', async (linkData, thunkAPI) => {
  const state = thunkAPI.getState();
  let token = state.auth.token;

  // Update token from fetch send
  if (!token) {
    try {
      const refreshResult = await thunkAPI.dispatch(refreshUser()).unwrap();
      token = refreshResult.data.accessToken;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('Token refresh failed');
    }
  }

  const formData = new FormData();
  formData.append('nameType', linkData.nameType ?? '');
  formData.append('link', linkData.link ?? '');
  formData.append('nameLink', linkData.nameLink ?? '');
  formData.append('textLink', linkData.textLink ?? '');

  if (linkData.poster) {
    formData.append('poster', linkData.poster);
  }

  try {
    const response = await axios.post<Link>('/links', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(err.response?.data.message || 'Add link');
  }
});

export const deleteLink = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>('deleteLink', async (linkId, thunkAPI) => {
  try {
    await axios.delete(`/links/${linkId}`);
    return { id: linkId };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data.message || 'Delete link'
    );
  }
});

export const editLink = createAsyncThunk<
  Link,
  EditLinkParams,
  { state: RootState; rejectValue: string }
>('editeLink', async ({ linkId, linkData }, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue('No access token available');
  }

  try {
    // 1. Create FormData
    const formData = new FormData();

    // 2. Add field (text)
    if (linkData.nameType) formData.append('nameType', linkData.nameType);
    if (linkData.link) formData.append('link', linkData.link);
    if (linkData.nameLink) formData.append('nameLink', linkData.nameLink);
    if (linkData.textLink) formData.append('textLink', linkData.textLink);
    if (linkData.poster) formData.append('poster', linkData.poster);
    // 3. If is file, add him
    if (linkData.poster) {
      formData.append('poster', linkData.poster);
    }
    const response = await axios.patch<EditLinkResponse>(
      `/links/${linkId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // ✅ Add `Authorization`
        },
        withCredentials: true, // ✅ Forward cookies
      }
    );
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(err.response?.data.message || 'Edit link');
  }
});

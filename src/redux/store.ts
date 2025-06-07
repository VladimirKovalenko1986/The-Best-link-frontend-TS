import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import taskReducer from './links/slice.ts';
import authReducer from './auth/slice.ts';
import themeReducer from './theme/slice.ts';
import { setAuthHeader } from './auth/operations.ts';
import type { Reducer } from '@reduxjs/toolkit';
import type { AuthState } from './auth/auth.type.ts';
import type { PersistPartial } from 'redux-persist/es/persistReducer';
import type { LinksState } from './links/links.type.ts';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
  whitelist: ['mode'],
};

const persistedAuthReducer: Reducer<AuthState & PersistPartial> =
  persistReducer(authPersistConfig, authReducer);

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const linksReducer: Reducer<LinksState> = taskReducer;

export const store = configureStore({
  reducer: {
    links: linksReducer,
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

persistor.subscribe(() => {
  const state = store.getState();
  if (state.auth.token) {
    setAuthHeader(state.auth.token);
  }
});

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '@/services/authApi';
import { cpUserInfoApi } from '@/services/cpUserInfoApi';
import authReducer from './slices/authSlice';
import { deviceApi } from '@/services/deviceApi';
import { specialistApi } from '@/services/specialistApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cpUserInfoApi.reducerPath]: cpUserInfoApi.reducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [specialistApi.reducerPath]: specialistApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cpUserInfoApi.middleware,
      deviceApi.middleware,
      specialistApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
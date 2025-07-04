import { baseUrl } from '@/utils/handleApiCall';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { success: boolean; data: LoginResponse }) => {
        console.log('Raw login response:', response);
        return response.data;
      },
    }),
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (newUser) => ({
        url: '/users/register',
        method: 'POST',
        body: newUser,
      }),
      transformResponse: (response: { success: boolean; data: RegisterResponse }) => {
        console.log('Raw register response:', response);
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterUserMutation, } = authApi;
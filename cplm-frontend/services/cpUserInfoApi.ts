import { baseUrl } from '@/utils/handleApiCall';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CPUserInfoRequest {
  canWalk: 'Yes' | 'No';
  handTrouble: 'Yes' | 'No';
  cpType: 'Spastic' | 'Hypotonic' | 'Dyskinetic' | 'Ataxic' | 'Mixed';
  canTalk: 'Yes' | 'No';
  canSee: 'Yes' | 'No';
  canHear: 'Yes' | 'No';
  needAssistance: 'Yes' | 'No';
  address: string;
}

export interface CPUserInfoResponse {
  userId: string;
  canWalk: boolean;
  handTrouble: boolean;
  cpType: string;
  canTalk: boolean;
  canSee: boolean;
  canHear: boolean;
  needAssistance: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log('Raw token from localStorage:', token);
    console.log('Token type:', typeof token);
    
    if (token === null) {
      console.log('Token is null');
      return null;
    }
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(token);
      console.log('Parsed token:', parsed);
      return parsed;
    } catch {
      // If JSON parsing fails, return as string
      console.log('Token is not JSON, using as string');
      return token;
    }
  }
  return null;
};

export const cpUserInfoApi = createApi({
  reducerPath: 'cpUserInfoApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log('Token being set in headers:', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        console.log('Authorization header set:', `Bearer ${token}`);
      } else {
        console.log('No token found, not setting authorization header');
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    saveCPUserInfo: builder.mutation<{ success: boolean; data: CPUserInfoResponse }, CPUserInfoRequest>({
      query: (cpUserInfo) => ({
        url: '/users/cp-info',
        method: 'POST',
        body: cpUserInfo,
      }),
    }),
    getCPUserInfo: builder.query<{ success: boolean; data: CPUserInfoResponse }, void>({
      query: () => '/users/cp-info',
    }),
  }),
});

export const { 
  useSaveCPUserInfoMutation, 
  useGetCPUserInfoQuery 
} = cpUserInfoApi; 
import { baseUrl } from "@/utils/handleApiCall";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interface for device search request
export interface DeviceSearchRequest {
  can_walk?: string;
  hand_trouble?: string;
  can_talk?: string;
  can_see?: string;
  can_hear?: string;
  need_assistance?: string;
  search_input?: string;
  category?: string;
}

// Helper function to get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token === null) {
      return null;
    }
    try {
      // Try to parse as JSON first
      return JSON.parse(token);
    } catch {
      // If JSON parsing fails, return as string
      return token;
    }
  }
  return null;
};

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDevices: builder.query({
        query: () => '/devices/all_devices',
    }),
    searchDevicesByUserInput: builder.mutation<any[], DeviceSearchRequest>({
      query: (searchParams) => ({
        url: '/devices/device_Search',
        method: 'POST',
        body: searchParams,
      }),
    }),
  }),
});

export const { useGetDevicesQuery, useSearchDevicesByUserInputMutation } = deviceApi;
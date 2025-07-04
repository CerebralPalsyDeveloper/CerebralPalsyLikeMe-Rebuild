import { baseUrl } from "@/utils/handleApiCall";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Interface for specialist search request
export interface SpecialistSearchRequest {
    specialist_name?: string;
    specialties?: string;
    address?: string;
    expertise?: string;
    search_input?: string;
    classification?: string;
}

//Interface for geocoding request
export interface GeocodingRequest {
    address: string;
}

//Interface for multiple geocoding request
export interface MultipleGeocodingRequest {
    addresses: string[];
}

//Interface for geocoding result
export interface GeocodingResult {
    lat: number;
    lon: number;
    display_name?: string;
}

//Helper function to get token from local storage
const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token === null) {
            return null;
        }
        try {
            return JSON.parse(token);
        } catch {
            return token;
        }
    }
    return null;
};

export const specialistApi = createApi({
    reducerPath: 'specialistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSpecialists: builder.query({
            query: () => '/specialists/all_specialists',
        }),
        getSpecialistsWithCoordinates: builder.query({
            query: () => '/specialists/specialists_with_coordinates',
        }),
        searchSpecialistsByUserInput: builder.mutation<any[], SpecialistSearchRequest>({
            query: (params) => ({
                url: '/specialists/specialist_Search',
                method: 'POST',
                body: params
            }),
        }),
        geocodeAddress: builder.mutation<GeocodingResult, GeocodingRequest>({
            query: (params) => ({
                url: '/specialists/geocode',
                method: 'POST',
                body: params
            }),
        }),
        geocodeMultipleAddresses: builder.mutation<Record<string, GeocodingResult | null>, MultipleGeocodingRequest>({
            query: (params) => ({
                url: '/specialists/geocode_multiple',
                method: 'POST',
                body: params
            }),
        }),
    }),
});

export const { 
    useGetSpecialistsQuery, 
    useGetSpecialistsWithCoordinatesQuery,
    useSearchSpecialistsByUserInputMutation,
    useGeocodeAddressMutation,
    useGeocodeMultipleAddressesMutation
} = specialistApi;
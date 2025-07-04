import { ApiError } from "../types/auth";
import { toast } from "react-toastify";

// Ensure the baseUrl has a trailing slash
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

type ApiCall = (...args: any[]) => Promise<any>;

export const handleApiCall = async (
    apiCall: ApiCall,
    args: any[],
    successCallback: (result: any) => void,
    failureCallback: (error: any) => void
) => {
    try {
        // Execute the API call and wait for the result
        const result = await apiCall(...args);
        // Check if there's an error in the RTK Query response
        if ('error' in result) {
            // If there's an error, call the failure callback
            failureCallback(result.error);
            return;
        }
        // If successful, call the success callback with the data
        successCallback(result.data);
    } catch (error) {
        const apiError = error as ApiError;

        // Check for authentication errors
        if (
            apiError.statusCode === 500 &&
            apiError.message === "jwt expired"
        ) {
            // Clear the token
            localStorage.setItem("token", "");

            // Show error message
            toast.error("Session expired. Please log in again.");

            // Redirect to login page
            window.location.href = "/";
            return;
        }
        // Handle any unexpected errors
        failureCallback(error);
    }
};
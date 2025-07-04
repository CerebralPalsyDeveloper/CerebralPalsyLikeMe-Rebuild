import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string;
    refreshToken: string | null;
    userType: string;
}

// Get initial token from localStorage if it exists
const getInitialToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token === null) {
            return '';
        }
        try {
            // Try to parse as JSON first
            return JSON.parse(token);
        } catch {
            // If JSON parsing fails, return as string
            return token;
        }
    }
    return '';
};

const initialState: AuthState = {
    isAuthenticated: !!getInitialToken(),
    token: getInitialToken(),
    refreshToken: "",
    userType: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string, userType?: string, isAuthenticated?: boolean, refreshToken?: string, }>) => {
            state.isAuthenticated = action.payload.isAuthenticated ?? true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken ?? '';
            state.userType = action.payload.userType ?? state.userType;
            
            // Also store in localStorage directly for consistency
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload.token);
                if (action.payload.refreshToken) {
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                }
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = '';
            state.refreshToken = '';
            
            // Clear from localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            }
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
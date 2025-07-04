"use client";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { ValidationError } from "@/components/ui/ValidationError";
import { useLoginMutation } from "@/services/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/slices/authSlice";
import { handleApiCall } from "@/utils/handleApiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { Language, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import styles from "../signup/signup.styles";
import { UserRole } from "@/constants/users";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/ui/LanguageSelector";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.selected}`]: {
      borderRadius: theme.shape.borderRadius,
    },
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
      {
        marginLeft: -1,
        borderLeft: "1px solid transparent",
      },
  }));

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div style={{ visibility: "hidden" }}>Loading...</div>;
  }

  const onSubmit = async (data: any) => {
    console.log('Starting login with data:', data);
    
    handleApiCall(
      login,
      [data],
      (userData) => {
        console.log('Login successful, userData received:', userData);
        console.log('userData type:', typeof userData);
        console.log('userData keys:', Object.keys(userData || {}));
        console.log('Access token:', userData?.accessToken);
        console.log('Token length:', userData?.accessToken?.length);
        
        if (!userData?.accessToken) {
          console.error('No access token received from server');
          console.error('Full userData object:', JSON.stringify(userData, null, 2));
          toast.error("Login failed: No token received");
          return;
        }
        
        // Store token directly in localStorage
        localStorage.setItem('token', userData.accessToken);
        localStorage.setItem('refreshToken', userData.refreshToken);
        
        console.log('Token stored in localStorage:', localStorage.getItem('token'));
        console.log('Token stored length:', localStorage.getItem('token')?.length);
        
        toast.success("Logged in successfully!");
        dispatch(
          setAuth({
            token: userData.accessToken,
            userType: "user",
            isAuthenticated: true
          })
        );
        router.push("/");
      },
      (error) => {
        console.error('Login error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        toast.error(error.message || "Login failed.");
      }
    );
  };

  // Inline styles for green card and centering
  const cardStyle = {
    background: "#7EDC89",
    borderRadius: 8,
    padding: 40,
    maxWidth: 500,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };
  const inputStyle = { background: "#fff", borderRadius: 4 };
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    background: "#fff",
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={cardStyle}>
        <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 2, color: "#222", textAlign: "center" }}>
          Login
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={<ValidationError message={errors.email?.message} />}
          sx={{ ...inputStyle, marginBottom: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={<ValidationError message={errors.password?.message} />}
          sx={{ ...inputStyle, marginBottom: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ background: "#fff", color: "#222", fontWeight: 600, borderRadius: 20, marginBottom: 2, textTransform: "none" }}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? (
            <CircularProgress size={20} sx={{ color: "#7EDC89" }} />
          ) : (
            "Login"
          )}
        </Button>
        <Button
          fullWidth
          component={Link}
          href="/signup"
          variant="contained"
          sx={{ background: "#fff", color: "#222", fontWeight: 600, borderRadius: 20, marginBottom: 2, textTransform: "none" }}
        >
          Create Account
        </Button>
        <Typography sx={{ color: "#222", fontSize: 14, marginTop: 1 }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: "#222", textDecoration: "underline" }}>
            Sign up
          </Link>
        </Typography>
      </form>
    </div>
  );
}
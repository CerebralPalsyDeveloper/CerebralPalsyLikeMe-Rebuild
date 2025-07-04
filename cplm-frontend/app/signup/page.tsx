"use client";

import { ValidationError } from "@/components/ui/ValidationError";
import { useLoginMutation, useRegisterUserMutation } from "@/services/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/slices/authSlice";

import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import styles from "./signup.styles";
import { UserRole } from "@/constants/users";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
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

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { t } = useTranslation();
  
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, t("signup.password_length"))
      .matches(/[A-Z]/, t("signup.password_uppercase"))
      .matches(/[a-z]/, t("signup.password_lowercase"))
      .matches(/[0-9]/, t("signup.password_number"))
      .matches(/[!@#$%^&*]/, t("signup.password_special"))
      .required(t("signup.password_required")),
      confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t("signup.passwords_must_match"))
      .required(t("signup.confirm_password_required")),
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
    try {
      // Register the user
      const registerResult = await registerUser(data).unwrap();
      console.log('Registration successful:', registerResult);
      
      // After successful registration, log the user in
      const loginResult = await login({
        email: data.email,
        password: data.password
      }).unwrap();
      
      console.log('Login after signup successful:', loginResult);
      
      if (!loginResult.accessToken) {
        console.error('No access token received from server');
        toast.error("Login failed: No token received");
        return;
      }
      
      // Store token directly in localStorage
      localStorage.setItem('token', loginResult.accessToken);
      localStorage.setItem('refreshToken', loginResult.refreshToken);
      
      toast.success("Account created successfully!");
      dispatch(
        setAuth({
          token: loginResult.accessToken,
          userType: "user",
          isAuthenticated: true
        })
      );
      router.push("/");
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error?.data?.message || error?.message || "Signup failed.");
    }
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
          Create Account
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={<ValidationError message={errors.firstName?.message} />}
          sx={{ ...inputStyle, marginBottom: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={<ValidationError message={errors.lastName?.message} />}
          sx={{ ...inputStyle, marginBottom: 2 }}
        />
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
          sx={{ ...inputStyle, marginBottom: 2 }}
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
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={<ValidationError message={errors.confirmPassword?.message} />}
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
            "Create Account"
          )}
        </Button>
        <Button
          fullWidth
          component={Link}
          href="/login"
          variant="contained"
          sx={{ background: "#fff", color: "#222", fontWeight: 600, borderRadius: 20, marginBottom: 2, textTransform: "none" }}
        >
          Already have an account? Login
        </Button>
        <Typography sx={{ color: "#222", fontSize: 14, marginTop: 1 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: "#222", textDecoration: "underline" }}>
            Login
          </Link>
        </Typography>
      </form>
    </div>
  );
}
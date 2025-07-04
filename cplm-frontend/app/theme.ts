import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans", sans-serif`, // ✅ Set Open Sans as the default font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            borderRadius: 12, // active state radius
            // You can add other active state styles here
            "&:hover": {
              borderRadius: 12, // ensure radius stays on hover
            },
          },
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;

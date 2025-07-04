"use client";

import theme from "@/app/theme";
import Navigation from "@/components/Navigation";
import {store} from "@/store";
import {ThemeProvider} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Open_Sans } from "next/font/google";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider"; // Import the provider

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={openSans.className}>
      <AppRouterCacheProvider options={{ enableCssLayer: false }}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
          <I18nProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
              </LocalizationProvider>
              <ToastContainer />
            </I18nProvider>
          </Provider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
  );
}
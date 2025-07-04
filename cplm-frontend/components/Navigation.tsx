"use client";
import { getRoutes } from "@/constants/routes";
import Link from "next/link";
import { Box, Button } from "@mui/material";

const Navigation = () => {
  const routes = getRoutes();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {routes.map((route) => (
        <Link key={route.path} href={route.path} passHref legacyBehavior>
          <Button sx={{ color: "#222", fontWeight: 500 }}>{route.name}</Button>
        </Link>
      ))}
    </Box>
  );
};

export default Navigation;
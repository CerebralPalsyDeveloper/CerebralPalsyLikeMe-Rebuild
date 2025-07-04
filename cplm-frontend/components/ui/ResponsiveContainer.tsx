import { Grid2 } from "@mui/material";

export function ResponsiveContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid2 container justifyContent="center">
      <Grid2
        size={{ xs: 12, sm: 8, md: 6, lg: 4 }}
        padding={3}
        paddingBottom={20}
      >
        {children}
      </Grid2>
    </Grid2>
  );
}

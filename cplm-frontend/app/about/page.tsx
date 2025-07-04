"use client";
import { Box, Typography, Container } from "@mui/material";
import HeaderContent from "@/components/ui/Header/Header";
import FooterContent from "@/components/ui/Footer/Footer";

export default function AboutPage() {
  return (
    <Box sx={{ background: "#F5F7FA", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <HeaderContent />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Container maxWidth="lg" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700, 
                color: "#222", 
                mb: 4,
                fontSize: { xs: "2rem", md: "3rem" }
              }}
            >
              About Us
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 500, 
                color: "#666", 
                fontSize: { xs: "1.5rem", md: "2rem" }
              }}
            >
              Coming soon...
            </Typography>
          </Box>
        </Container>
      </Box>
      <FooterContent />
    </Box>
  );
} 
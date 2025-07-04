"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import HeaderContent from "@/components/ui/Header/Header";
import FooterContent from "@/components/ui/Footer/Footer";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <Box sx={{ background: "#F5F7FA", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <HeaderContent />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Main Section */}
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 6, flexWrap: { xs: "wrap", md: "nowrap" } }}>
          {/* Left: Image */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", mb: { xs: 4, md: 0 } }}>
            <Image src="/images/service_pic1.jpg" alt="Specialized Care" width={350} height={300} style={{ borderRadius: 12, objectFit: "cover" }} />
          </Box>
          {/* Right: Text */}
          <Box sx={{ flex: 1, pl: { md: 8 }, minWidth: 300 }}>
            <Typography variant="h4" sx={{ color: "#4CAF50", fontWeight: 700, mb: 2 }}>
              Find the Specialized Care that you Need
            </Typography>
            <Typography sx={{ color: "#222", mb: 3, fontSize: 22 }}>
              By choosing to look for specialists or assistive devices, and answering some questions on your account about your CP and experiences, we can help you find what you are looking for.
            </Typography>
          </Box>
        </Container>
        {/* Option Buttons Section */}
        <Box sx={{ background: "#80D588", py: 6, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: "#222", fontWeight: 700, mb: 3 }}>
            Find a
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Link href="/specialist-page" passHref legacyBehavior>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 'bold',
                  border: '1px solid black',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontSize: '24px',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    boxShadow: 'none',
                  },
                }}
              >
                Specialist
              </Button>
            </Link>
            <Link href="/device-page" passHref legacyBehavior>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 'bold',
                  border: '1px solid black',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontSize: '24px',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    boxShadow: 'none',
                  },
                }}
              >
                Assistive Devices
              </Button>
            </Link>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }} />
      </Box>
      <FooterContent />
    </Box>
  );
} 
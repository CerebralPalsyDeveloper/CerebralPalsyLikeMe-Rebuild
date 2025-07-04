'use client';
import { Box, Button, Container, Typography, Grid, Paper } from "@mui/material";
import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./LandingContent.styles";
import HeaderContent from "../Header/Header";
import FooterContent from "../Footer/Footer";
import useAppSelector from "@/store/hooks/useAppSelector";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const LandingContent = () => {

    const [hydrated, setHydrated] = useState(false);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            dispatch(logout());
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            router.push("/");
        }
    };

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;
    return (
        <Box sx={{ background: '#F5F7FA', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <HeaderContent />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top Section */}
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 6 }}>
                    {/* Left: Headline and Buttons */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700, mb: 2 }}>
                            {t("landing.title")}
                        </Typography>
                        <Typography sx={{ color: '#222', mb: 3 }}>
                            {t("landing.description")}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link href="/signup" passHref legacyBehavior>
                                <Button variant="contained" sx={{ background: '#222', color: '#fff', fontWeight: 600, borderRadius: 2 }}>
                                    {t("landing.signup")}
                                </Button>
                            </Link>
                            {isAuthenticated ? (
                                <Button variant="outlined" onClick={handleLogout} sx={{ color: '#222', borderColor: '#222', fontWeight: 600, borderRadius: 2 }}>
                                    {t("landing.logout")}
                                </Button>
                            ) : (
                                <Link href="/login" passHref legacyBehavior>
                                    <Button variant="outlined" sx={{ color: '#222', borderColor: '#222', fontWeight: 600, borderRadius: 2 }}>
                                        {t("landing.login")}
                                    </Button>
                                </Link>
                            )}
                        </Box>
                    </Box>
                    {/* Right: Placeholder Image */}
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Image src="/images/hp_pic1.jpg" alt="Landing" width={350} height={250} style={{ borderRadius: 12 }} />
                    </Box>
                </Container>
                {/* Services Section */}
                <Box sx={{ background: '#E9ECEF', py: 6 }}>
                    <Container maxWidth="md">
                        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
                            {t("landing.services")}
                        </Typography>
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                                    <Image src="/images/Service1.jpg" alt="Find Care" width={80} height={80} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                                        {t("landing.find_care")}
                                    </Typography>
                                    <Typography sx={{ color: '#444', mt: 1 }}>
                                        {t("landing.find_care_search")}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                                    <Image src="/images/Service2.jpg" alt="Find Assisted Devices" width={80} height={80} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                                        {t("landing.find_assistive_devices")}
                                    </Typography>
                                    <Typography sx={{ color: '#444', mt: 1 }}>
                                        {t("landing.find_devices_search")}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                {/* Empowering Access Section */}
                <Box sx={{ background: '#fff', py: 6 }}>
                    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {/* Left: Placeholder Image */}
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <Image src="/images/hp_pic2.jpg" alt="Empowering Access" width={250} height={250} style={{ borderRadius: 12 }} />
                        </Box>
                        {/* Right: Text */}
                        <Box sx={{ flex: 2 }}>
                            <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 700, mb: 2 }}>
                                {t("landing.empowering")}
                            </Typography>
                            <Typography sx={{ color: '#222' }}>
                                {t("landing.empowering_description")}
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <FooterContent />
        </Box>
    );
};

export default LandingContent;

'use client';
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeaderContent.styles";
import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/ui/LanguageSelector";
import useAppSelector from "@/store/hooks/useAppSelector";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";


const HeaderContent = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        router.push("/");
    };
    const handleMyAccount = () => {
        if (isAuthenticated) {
            router.push("/account");
        } else {
            router.push("/login");
        }
    };
    const { t } = useTranslation();
    return (
        <AppBar position="static" sx={{ background: '#80D588', boxShadow: 'none', paddingY: 0, height: 60, top: 0 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, minHeight: '60px !important' }}>
                {/* Logo and Site Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
                    <Image src="/images/logo.png" alt="Logo" height={60} width={138} style={{ objectFit: 'contain' }} />
                    <Typography sx={{ color: '#222', fontWeight: 1000, marginLeft: 1, fontSize: 16 }}>Cerebral Palsy Like Me</Typography>
                </Box>
                {/* Navigation Links */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Link href="/" passHref legacyBehavior>
                        <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#005400' } }}>{t("header.home")}</Button>
                    </Link>
                    <Link href="/about" passHref legacyBehavior>
                        <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#005400' } }}>{t("header.about")}</Button>
                    </Link>
                    <Link href="/services" passHref legacyBehavior>
                        <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#005400' } }}>{t("header.services")}</Button>
                    </Link>
                    <Link href="/contact" passHref legacyBehavior>
                        <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#005400' } }}>{t("header.contact")}</Button>
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LanguageSelector />
                    <Link href="/account" passHref legacyBehavior>
                        <Button variant="contained" onClick={handleMyAccount} sx={{ background: '#fff', color: '#222', fontWeight: 1000, borderRadius: 2, boxShadow: 1, '&:hover': { background: '#f0f0f0' } }}>
                            {t("header.my_account")}
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderContent;
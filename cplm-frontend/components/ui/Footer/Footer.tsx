'use client';
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FooterContent = () => {
    const { t } = useTranslation();
    return (
        <Box component="footer" sx={{ background: '#f4f4f4', boxShadow: 'none', width: '100%', height: 60, display: 'flex', alignItems: 'center', px: 4, mt: 'auto' }}>
            {/* Logo and Site Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
                <Image src="/images/logo.png" alt="Logo" height={60} width={138} style={{ objectFit: 'contain' }} />
            </Box>
            {/* Navigation Links */}
            <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
                <Link href="/" passHref legacyBehavior>
                    <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#787878' } }}>{t("header.home")}</Button>
                </Link>
                <Link href="/about" passHref legacyBehavior>
                    <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#787878' } }}>{t("header.about")}</Button>
                </Link>
                <Link href="/resources" passHref legacyBehavior>
                    <Button sx={{ color: '#222', fontWeight: 1000, fontSize: 16, backgroundColor: 'transparent', '&:hover': { backgroundColor: '#787878' } }}>{t("footer.resources")}</Button>
                </Link>
            </Box>
        </Box>
    );
};

export default FooterContent;
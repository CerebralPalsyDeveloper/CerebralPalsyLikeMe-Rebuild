// components/ui/LanguageSelector.tsx

"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material";
import { Select, MenuItem, FormControl } from "@mui/material";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Ensure this runs only on the client
        const savedLanguage = localStorage.getItem("language") || "en";
        i18n.changeLanguage(savedLanguage);
        setLoaded(true); // Mark as loaded after language is set
    }, [i18n]);

    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        const lang = event.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    // Prevent rendering until language is loaded to avoid mismatch
    if (!loaded) return null;

    return (
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <Select
                data-testid="language-selector"
                value={i18n.language}
                onChange={handleLanguageChange}
                sx={{
                    background: '#fff',
                    color: '#222',
                    fontWeight: 1000,
                    borderRadius: 2,
                    boxShadow: 1,
                    '& .MuiSelect-select': { padding: '8px 24px 8px 12px' },
                    '&:hover': { background: '#f0f0f0' },
                }}
            >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
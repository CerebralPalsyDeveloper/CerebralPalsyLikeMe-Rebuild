//components/I18nProvider.tsx

"use client"; // Ensure this is treated as a client component

import { ReactNode } from "react";
import "../utils/i18n"; // Import i18n here instead of layout.tsx
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

const I18nProvider = ({ children }: { children: ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;

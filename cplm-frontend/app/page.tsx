"use client"

import LandingContent from "@/components/ui/Landing/LandingContent";
import { Box } from "@mui/material";
import styles from "./page.styles";
import {useEffect} from "react";
import { useRouter } from "next/navigation";
import {useAppSelector} from "@/store/hooks";
import { RootState } from "@/store/store";

export default function LandingPage() {
  const router = useRouter();
  const {isAuthenticated, token} = useAppSelector((state: RootState) => state.auth);

  /*
  useEffect(() => {
    if (isAuthenticated && token) {
      router.replace("/account");
    }
  }, [isAuthenticated, token, router]);
  */

  return <LandingContent />
}

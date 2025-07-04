"use client";
import { Box, Typography, Paper, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Grid, Button, Alert, Card, CardContent, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import useAppSelector from "@/store/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import { useSaveCPUserInfoMutation, useGetCPUserInfoQuery } from "@/services/cpUserInfoApi";

import { toast } from "react-toastify";
import HeaderContent from "@/components/ui/Header/Header";
import FooterContent from "@/components/ui/Footer/Footer";

export default function AccountPage() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const [saveCPUserInfo] = useSaveCPUserInfoMutation();
  const { data: cpUserInfo, isLoading: isLoadingInfo, error } = useGetCPUserInfoQuery();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  // Form state
  const [address, setAddress] = useState("");
  const [cpType, setCpType] = useState("");
  const [canWalk, setCanWalk] = useState("");
  const [canTalk, setCanTalk] = useState("");
  const [troubleHands, setTroubleHands] = useState("");
  const [canSee, setCanSee] = useState("");
  const [canHear, setCanHear] = useState("");
  const [needAssistance, setNeedAssistance] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  // Load existing data when component mounts or data is fetched
  useEffect(() => {
    if (cpUserInfo?.data) {
      const data = cpUserInfo.data;
      setAddress(data.address || "");
      setCpType(data.cpType || "");
      setCanWalk(data.canWalk ? "Yes" : "No");
      setCanTalk(data.canTalk ? "Yes" : "No");
      setTroubleHands(data.handTrouble ? "Yes" : "No");
      setCanSee(data.canSee ? "Yes" : "No");
      setCanHear(data.canHear ? "Yes" : "No");
      setNeedAssistance(data.needAssistance ? "Yes" : "No");
    }
  }, [cpUserInfo]);

  const handleSave = async () => {
    if (!canWalk || !troubleHands || !cpType || !canTalk || !canSee || !canHear || !needAssistance || !address) {
      setErrorMsg("Please answer all questions");
      setMessage("");
      return;
    }

    const cpUserData = {
      canWalk: canWalk as 'Yes' | 'No',
      handTrouble: troubleHands as 'Yes' | 'No',
      cpType: cpType as 'Spastic' | 'Hypotonic' | 'Dyskinetic' | 'Ataxic' | 'Mixed',
      canTalk: canTalk as 'Yes' | 'No',
      canSee: canSee as 'Yes' | 'No',
      canHear: canHear as 'Yes' | 'No',
      needAssistance: needAssistance as 'Yes' | 'No',
      address,
    };

    try {
      const result = await saveCPUserInfo(cpUserData).unwrap();
      setErrorMsg("");
      setMessage("Answers saved successfully!");
      toast.success("CP information saved successfully!");
      // refetch(); // Not needed, RTK Query will update cache
    } catch (error: any) {
      setErrorMsg(error?.data?.message || error?.message || "Failed to save answers");
      setMessage("");
      toast.error("Failed to save CP information");
    }
  };

  // Don't render anything until hydrated to prevent hydration mismatch
  if (!hydrated) {
    return null;
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Show loading spinner while fetching data
  if (isLoadingInfo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error only if it's not a 404 (404 means no info yet, which is fine)
  const is404 = error && typeof error === 'object' && 'status' in error && error.status === 404;
  if (error && !is404) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">Failed to load user info</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#F5F7FA", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <HeaderContent />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ background: "#f4f4f4", py: 4, flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center", mb: 4, mt: 2 }}>
            Answer a couple of questions to help us find you the best care
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Personal Information
                  </Typography>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    sx={{ background: "#f9f9f9", mb: 2 }}
                  />
                </CardContent>
              </Card>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    About Your CP
                  </Typography>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend">What type of CP do you have?</FormLabel>
                    <RadioGroup
                      row
                      value={cpType}
                      onChange={e => setCpType(e.target.value)}
                    >
                      <FormControlLabel value="Spastic" control={<Radio />} label="Spastic" />
                      <FormControlLabel value="Hypotonic" control={<Radio />} label="Hypotonic" />
                      <FormControlLabel value="Dyskinetic" control={<Radio />} label="Dyskinetic" />
                      <FormControlLabel value="Ataxic" control={<Radio />} label="Ataxic" />
                      <FormControlLabel value="Mixed" control={<Radio />} label="Mixed" />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Abilities & Needs
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        label: "Can you walk?",
                        value: canWalk,
                        setValue: setCanWalk,
                      },
                      {
                        label: "Can you talk?",
                        value: canTalk,
                        setValue: setCanTalk,
                      },
                      {
                        label: "Do you have trouble using one of your hands?",
                        value: troubleHands,
                        setValue: setTroubleHands,
                      },
                      {
                        label: "Are you visually impaired?",
                        value: canSee,
                        setValue: setCanSee,
                      },
                      {
                        label: "Are you hearing impaired?",
                        value: canHear,
                        setValue: setCanHear,
                      },
                      {
                        label: "Do you need a daily living device?",
                        value: needAssistance,
                        setValue: setNeedAssistance,
                      },
                    ].map((q, idx) => (
                      <Grid item xs={12} key={q.label}>
                        <FormControl
                          component="fieldset"
                          sx={{
                            width: "100%",
                            background: idx % 2 === 0 ? "#7EDC89" : "#f4f4f4",
                            borderRadius: 2,
                            p: 0,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Typography sx={{ fontWeight: 500, mr: 3 }}>{q.label}</Typography>
                            <RadioGroup
                              row
                              value={q.value}
                              onChange={e => q.setValue(e.target.value)}
                            >
                              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                          </Box>
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Button variant="contained" color="success" onClick={handleSave} sx={{ fontWeight: 700, borderRadius: 2, px: 4 }}>
                  Save
                </Button>
              </Box>
              {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
              {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
              {cpUserInfo?.data && (
                <Card sx={{ mt: 4 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      Your Saved Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}><b>Address:</b> {cpUserInfo.data.address}</Grid>
                      <Grid item xs={12} md={6}><b>Type of CP:</b> {cpUserInfo.data.cpType}</Grid>
                      <Grid item xs={12} md={6}><b>Can you walk?</b> {cpUserInfo.data.canWalk ? "Yes" : "No"}</Grid>
                      <Grid item xs={12} md={6}><b>Can you talk?</b> {cpUserInfo.data.canTalk ? "Yes" : "No"}</Grid>
                      <Grid item xs={12} md={6}><b>Trouble using one hand?</b> {cpUserInfo.data.handTrouble ? "Yes" : "No"}</Grid>
                      <Grid item xs={12} md={6}><b>Visually impaired?</b> {cpUserInfo.data.canSee ? "Yes" : "No"}</Grid>
                      <Grid item xs={12} md={6}><b>Hearing impaired?</b> {cpUserInfo.data.canHear ? "Yes" : "No"}</Grid>
                      <Grid item xs={12} md={6}><b>Need a daily living device?</b> {cpUserInfo.data.needAssistance ? "Yes" : "No"}</Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <FooterContent />
    </Box>
  );
}

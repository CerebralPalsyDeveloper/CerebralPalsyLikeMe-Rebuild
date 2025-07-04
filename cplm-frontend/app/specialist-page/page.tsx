"use client";
import { useState, useMemo } from "react";
import { Box, Button, Container, Typography, TextField, Grid, Card, CardContent, CircularProgress, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useGetSpecialistsQuery, useSearchSpecialistsByUserInputMutation } from "@/services/specialistApi";
import { useGetCPUserInfoQuery } from "@/services/cpUserInfoApi";
import HeaderContent from "@/components/ui/Header/Header";
import FooterContent from "@/components/ui/Footer/Footer";
import Link from "next/link";
import useAppSelector from "@/store/hooks/useAppSelector";

export default function SpecialistPage() {
  const { data: allSpecialistsData, isLoading: isLoadingAllSpecialists, error: allSpecialistsError } = useGetSpecialistsQuery(undefined);
  const { data: userCPInfo, isLoading: isLoadingUserInfo } = useGetCPUserInfoQuery();
  const [searchSpecialistsByUserInput, { isLoading: isSearching }] = useSearchSpecialistsByUserInputMutation();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
  const [searchInput, setSearchInput] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const classificationOptions = [
    'Spastic', 
    'Dyskinetic', 
    'Mixed-Typed', 
    'Ataxic'
  ];

  // Map user CP types to specialist classifications
  const mapUserCPTypeToSpecialistClassification = (userCPType: string): string => {
    switch (userCPType) {
      case 'Spastic':
        return 'Spastic';
      case 'Dyskinetic':
        return 'Dyskinetic';
      case 'Ataxic':
        return 'Ataxic';
      case 'Mixed':
        return 'Mixed-Typed';
      case 'Hypotonic':
        // Hypotonic doesn't have a direct mapping in specialist classifications
        // Return empty string to show all specialists
        return '';
      default:
        return '';
    }
  };

  // Use search results if in search mode, otherwise use all specialists
  const allSpecialists = isSearchMode ? searchResults : (allSpecialistsData?.data || []);

  // Normalize allSpecialists first
  const normalizedSpecialists = useMemo(() =>
    allSpecialists.map((specialist: any) => ({
      name: specialist.SpecialistName || specialist.specialist_name,
      specialties: specialist.Specialties || specialist.specialties,
      address: specialist.Address || specialist.address,
      expertise: specialist.Expertise || specialist.expertise,
      classification: specialist.Classification || specialist.classification,
    }))
  , [allSpecialists]);

  // Filter specialists by search input and/or classification (client-side for dropdown)
  const filteredSpecialists = useMemo(() => {
    let specialists = normalizedSpecialists;
    // Only filter by dropdown on client side when NOT in search mode
    if (!isSearchMode && selectedClassification && selectedClassification !== "All Classifications") {
      specialists = specialists.filter((s: any) =>
        Array.isArray(s.classification) &&
        s.classification.length > 0 &&
        s.classification.includes(selectedClassification)
      );
    }
    if (searchInput.trim()) {
      specialists = specialists.filter((s: any) =>
        s.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        s.specialties?.toLowerCase().includes(searchInput.toLowerCase()) ||
        s.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
        s.expertise?.toLowerCase().includes(searchInput.toLowerCase()) ||
        (Array.isArray(s.classification) && s.classification.some((c: string) => 
          c.toLowerCase().includes(searchInput.toLowerCase())
        ))
      );
    }
    return specialists;
  }, [normalizedSpecialists, searchInput, selectedClassification, isSearchMode]);

  // Handle search by user input (triggers backend search)
  const handleSearchByUserInput = async () => {
    if (!isAuthenticated) {
      alert("Please log in to search by your CP type.");
      return;
    }

    if (!userCPInfo?.data) {
      alert("Please complete your CP information profile first.");
      return;
    }

    try {
      // Map user's CP type to specialist classification
      const userClassification = mapUserCPTypeToSpecialistClassification(userCPInfo.data.cpType);
      
      const searchParams = {
        search_input: searchInput,
        classification: userClassification || undefined,
      };

      const result = await searchSpecialistsByUserInput(searchParams).unwrap();
      setSearchResults(result);
      setIsSearchMode(true);
    } catch (error) {
      console.error("Error searching specialists:", error);
      alert("Failed to search specialists. Please try again.");
    }
  };

  // Handle reset to show all specialists
  const handleShowAllSpecialists = () => {
    setIsSearchMode(false);
    setSearchResults([]);
    setSearchInput("");
    setSelectedClassification("");
  };

  const isLoading = isLoadingAllSpecialists || isLoadingUserInfo || isSearching;

  return (
    <Box sx={{ background: '#f5f7fa', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeaderContent />
      <Container maxWidth={false} sx={{ mt: 4, mb: 2, px: 0 }}>
        {/* Title with no background, black font */}
        <Typography variant="h4" align="center" fontWeight={700} sx={{ color: '#000', fontSize: { xs: 28, md: 36 }, mb: 2 }}>
          Browse Hundreds of Specialists
        </Typography>
        <Box display="flex" justifyContent="center" mb={2} gap={2}>
          <Button
            sx={{
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 1,
              fontSize: 18,
              background: isSearchMode ? '#000' : '#fff',
              color: isSearchMode ? '#fff' : '#000',
              border: '2px solid #000',
              boxShadow: 'none',
              opacity: isAuthenticated ? 1 : 0.5,
              cursor: isAuthenticated ? 'pointer' : 'not-allowed',
              '&:hover': { 
                background: isAuthenticated ? (isSearchMode ? '#333' : '#f5f5f5') : (isSearchMode ? '#000' : '#fff'), 
                color: isAuthenticated ? (isSearchMode ? '#fff' : '#000') : (isSearchMode ? '#fff' : '#000'), 
                border: '2px solid #000', 
                boxShadow: 'none' 
              },
              '&:disabled': {
                background: '#f5f5f5',
                color: '#999',
                border: '2px solid #ccc',
                cursor: 'not-allowed',
              }
            }}
            onClick={handleSearchByUserInput}
            disabled={isLoading || !isAuthenticated}
          >
            Search by My CP Type
          </Button>
          {isSearchMode && (
            <Button
              sx={{
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 1,
                fontSize: 18,
                background: '#fff',
                color: '#000',
                border: '2px solid #000',
                boxShadow: 'none',
                '&:hover': { background: '#f5f5f5', color: '#000', border: '2px solid #000', boxShadow: 'none' },
              }}
              onClick={handleShowAllSpecialists}
            >
              Show All Specialists
            </Button>
          )}
          <Link href="/specialist-map" passHref legacyBehavior>
            <Button
              sx={{
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 1,
                fontSize: 18,
                background: '#fff',
                color: '#000',
                border: '2px solid #000',
                boxShadow: 'none',
                '&:hover': { background: '#f5f5f5', color: '#000', border: '2px solid #000', boxShadow: 'none' },
              }}
            >
              Specialists Map
            </Button>
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" mb={4} gap={2}>
          <TextField
            placeholder="Search by name, specialties, address, expertise, or classification..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            sx={{ width: "40%", background: "#fff", borderRadius: 5, boxShadow: 1, input: { fontSize: 18, py: 1.5 } }}
            InputProps={{ style: { borderRadius: 32 } }}
          />
          <FormControl sx={{ width: "20%", background: "#fff", borderRadius: 5, boxShadow: 1 }}>
            <InputLabel>Classification</InputLabel>
            <Select
              value={selectedClassification}
              onChange={e => setSelectedClassification(e.target.value)}
              label="Classification"
              sx={{ borderRadius: 32 }}
            >
              <MenuItem value="">All Classifications</MenuItem>
              {classificationOptions.map((classification) => (
                <MenuItem key={classification} value={classification}>
                  {classification}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Black label for Types of Specialists, no tabs */}
        <Typography variant="h6" align="center" fontWeight={700} sx={{ color: '#000', fontSize: 22, mb: 3 }}>
          {isSearchMode ? 'Specialists Matching Your CP Type' : 'Types of Specialists'}
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : (allSpecialistsError || (isSearchMode && searchResults.length === 0)) ? (
          <Typography color="error" align="center">
            {isSearchMode ? 'No specialists found matching your CP type. Try adjusting your search criteria.' : 'Failed to load specialists.'}
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {filteredSpecialists.length === 0 ? (
              <Typography>No specialists found.</Typography>
            ) : (
              filteredSpecialists.map((specialist: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ 
                    height: 300, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: 4, 
                    boxShadow: 3, 
                    p: 2,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1, p: 2 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: 18, mb: 2 }}>
                        {specialist.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <span style={{ fontWeight: 700, color: '#1976d2' }}>Specialties:</span> {specialist.specialties}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <span style={{ fontWeight: 700, color: '#1976d2' }}>Address:</span> {specialist.address}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <span style={{ fontWeight: 700, color: '#1976d2' }}>Expertise:</span> {specialist.expertise}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ fontWeight: 700, color: '#1976d2' }}>Classification:</span> {Array.isArray(specialist.classification) ? specialist.classification.join(', ') : (specialist.classification || 'None')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
      <FooterContent />
    </Box>
  );
}
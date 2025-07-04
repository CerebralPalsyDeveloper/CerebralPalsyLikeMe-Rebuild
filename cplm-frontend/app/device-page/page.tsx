"use client";
import { useState, useMemo } from "react";
import { Box, Button, Container, Typography, TextField, Grid, Card, CardContent, CardMedia, CircularProgress, Tabs, Tab } from "@mui/material";
import { useGetDevicesQuery, useSearchDevicesByUserInputMutation } from "@/services/deviceApi";
import { useGetCPUserInfoQuery } from "@/services/cpUserInfoApi";
import HeaderContent from "@/components/ui/Header/Header";
import FooterContent from "@/components/ui/Footer/Footer";
import useAppSelector from "@/store/hooks/useAppSelector";

export default function DevicePage() {
  const { data: allDevicesData, isLoading: isLoadingAllDevices, error: allDevicesError } = useGetDevicesQuery(undefined);
  const { data: userCPInfo, isLoading: isLoadingUserInfo } = useGetCPUserInfoQuery();
  const [searchDevicesByUserInput, { isLoading: isSearching }] = useSearchDevicesByUserInputMutation();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Use search results if in search mode, otherwise use all devices
  const allDevices = isSearchMode ? searchResults : (allDevicesData?.data || []);

  // Get all unique categories
  const categories = useMemo<string[]>(() => {
    const cats = Array.from(new Set(allDevices.map((d: any) => d.Category).filter(Boolean))) as string[];
    return ["All", ...cats];
  }, [allDevices]);

  // Filter devices by search input and/or category
  const filteredDevices = useMemo(() => {
    let devices = allDevices;
    if (activeCategory !== "All") {
      devices = devices.filter((d: any) => d.Category === activeCategory);
    }
    if (searchInput.trim()) {
      devices = devices.filter((d: any) =>
        d.DeviceName?.toLowerCase().includes(searchInput.toLowerCase()) ||
        d.DeviceDescription?.toLowerCase().includes(searchInput.toLowerCase()) ||
        d.Category?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    // Custom category order
    const categoryOrder = [
      'Mobility',
      'Communication',
      'Vision',
      'Hearing',
      'Daily Living',
    ];
    return devices.slice().sort((a: any, b: any) => {
      const aIndex = categoryOrder.indexOf(a.Category);
      const bIndex = categoryOrder.indexOf(b.Category);
      if (aIndex !== -1 && bIndex !== -1) {
        if (aIndex !== bIndex) return aIndex - bIndex;
      } else if (aIndex !== -1) {
        return -1;
      } else if (bIndex !== -1) {
        return 1;
      } else {
        // Both not in the list, sort alphabetically
        if ((a.Category || '') < (b.Category || '')) return -1;
        if ((a.Category || '') > (b.Category || '')) return 1;
      }
      // If same category, sort by DeviceName
      if ((a.DeviceName || '') < (b.DeviceName || '')) return -1;
      if ((a.DeviceName || '') > (b.DeviceName || '')) return 1;
      return 0;
    });
  }, [allDevices, searchInput, activeCategory]);

  // Group devices by category for display
  const groupedDevices = useMemo(() => {
    return filteredDevices.reduce((acc: any, device: any) => {
      const cat = device.Category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(device);
      return acc;
    }, {});
  }, [filteredDevices]);

  // Custom category order
  const categoryOrder = [
    'Mobility',
    'Communication',
    'Vision',
    'Hearing',
    'Daily Living',
  ];
  // All categories in use, sorted by custom order then alphabetically
  const allCategories = useMemo(() => {
    const cats = Object.keys(groupedDevices);
    const ordered = [
      ...categoryOrder.filter(cat => cats.includes(cat)),
      ...cats.filter(cat => !categoryOrder.includes(cat)).sort()
    ];
    return ordered;
  }, [groupedDevices]);

  // Handle search by user input
  const handleSearchByUserInput = async () => {
    if (!isAuthenticated) {
      alert("Please log in to search by your user information.");
      return;
    }

    if (!userCPInfo?.data) {
      alert("Please complete your CP information profile first.");
      return;
    }

    try {
      const searchParams = {
        can_walk: userCPInfo.data.canWalk ? "Yes" : "No",
        hand_trouble: userCPInfo.data.handTrouble ? "Yes" : "No",
        can_talk: userCPInfo.data.canTalk ? "Yes" : "No",
        can_see: userCPInfo.data.canSee ? "Yes" : "No",
        can_hear: userCPInfo.data.canHear ? "Yes" : "No",
        need_assistance: userCPInfo.data.needAssistance ? "Yes" : "No",
        search_input: searchInput,
        category: activeCategory !== "All" ? activeCategory : undefined,
      };

      const result = await searchDevicesByUserInput(searchParams).unwrap();
      setSearchResults(result);
      setIsSearchMode(true);
    } catch (error) {
      console.error("Error searching devices:", error);
      alert("Failed to search devices. Please try again.");
    }
  };

  // Handle reset to show all devices
  const handleShowAllDevices = () => {
    setIsSearchMode(false);
    setSearchResults([]);
    setSearchInput("");
    setActiveCategory("All");
  };

  const isLoading = isLoadingAllDevices || isLoadingUserInfo || isSearching;

  return (
    <Box sx={{ background: '#f5f7fa', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeaderContent />
      <Container maxWidth={false} sx={{ mt: 4, mb: 2, px: 0 }}>
        {/* Title with no background, black font */}
        <Typography variant="h4" align="center" fontWeight={700} sx={{ color: '#000', fontSize: { xs: 28, md: 36 }, mb: 2 }}>
          Browse Hundreds of Devices
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
            Search by User Information
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
              onClick={handleShowAllDevices}
            >
              Show All Devices
            </Button>
          )}
        </Box>
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            placeholder="Search by device name, description, or category..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            sx={{ width: "60%", background: "#fff", borderRadius: 5, mr: 2, boxShadow: 1, input: { fontSize: 18, py: 1.5 } }}
            InputProps={{ style: { borderRadius: 32 } }}
          />
        </Box>
        {/* Black label for Types of Assisted Devices, no tabs */}
        <Typography variant="h6" align="center" fontWeight={700} sx={{ color: '#000', fontSize: 22, mb: 3 }}>
          {isSearchMode ? 'Devices Matching Your Profile' : 'Types of Assistive Devices'}
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : (allDevicesError || (isSearchMode && searchResults.length === 0)) ? (
          <Typography color="error" align="center">
            {isSearchMode ? 'No devices found matching your profile. Try adjusting your search criteria.' : 'Failed to load devices.'}
          </Typography>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(${allCategories.length}, 240px)`,
              justifyContent: 'center',
              columnGap: '36px',
              rowGap: 0,
              overflowX: 'auto',
            }}
          >
            {allCategories.length === 0 && (
              <Typography>No devices found.</Typography>
            )}
            {allCategories.map((cat) => (
              <Box key={cat} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 240 }}>
                <Typography variant="h6" fontWeight={700} align="center" sx={{ mb: 2 }}>{cat}</Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                  {groupedDevices[cat]?.sort((a: any, b: any) => (a.DeviceName || '').localeCompare(b.DeviceName || '')).map((device: any, idx: number, arr: any[]) => (
                    <Box key={device.DeviceID} sx={{ width: 240, height: 240, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, position: 'relative', mb: idx < arr.length - 1 ? '1px' : 0 }}>
                      <Card sx={{ width: 240, height: 240, minWidth: 240, minHeight: 240, maxWidth: 240, maxHeight: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 4, boxShadow: 3, p: 2, m: 0 }}>
                        {device.Image && (
                          device.Website ? (
                            <a href={device.Website} target="_blank" rel="noopener noreferrer" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                              <CardMedia
                                component="img"
                                height="100"
                                image={device.Image}
                                alt={device.DeviceName}
                                sx={{ objectFit: "contain", width: 'auto', maxWidth: 180, mb: 2, mt: 2, maxHeight: 100, display: 'block', mx: 'auto' }}
                              />
                            </a>
                          ) : (
                            <CardMedia
                              component="img"
                              height="100"
                              image={device.Image}
                              alt={device.DeviceName}
                              sx={{ objectFit: "contain", width: 'auto', maxWidth: 180, mb: 2, mt: 2, maxHeight: 100, display: 'block', mx: 'auto' }}
                            />
                          )
                        )}
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1, p: 0 }}>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: 18 }}>{device.DeviceName}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{device.DeviceDescription}</Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <FooterContent />
    </Box>
  );
}
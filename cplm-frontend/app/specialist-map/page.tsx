"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Button, Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useGetCPUserInfoQuery } from "@/services/cpUserInfoApi";
import HeaderContent from "@/components/ui/Header/Header";
import FooterContent from "@/components/ui/Footer/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix for default markers in Leaflet
const L = typeof window !== "undefined" ? require("leaflet") : null;

if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

// Custom icons
const createCustomIcon = (iconUrl: string) => {
  if (typeof window === "undefined" || !L) return null;
  
  return L.icon({
    iconUrl,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

const hardcodedSpecialist = {
  lat: 30.4232286,
  lon: -97.7555572,
  name: "Dr. Jose A. Urquidez",
  specialties: "Physiatry, Emergency Medicine",
  expertise: "Cerebral Palsy, Decorticate Posture, Decerebrate Posture, Opisthotonos",
  address: "11851 Jollyville Rd, Suite 103, Austin, TX",
};

const hardcodedUser = {
  lat: 30.230854,
  lon: -97.756169,
  address: "3001 S. Congress Avenue Austin, TX 78704",
};

export default function SpecialistMap() {
  const { data: userCPInfo, isLoading: isLoadingUserInfo } = useGetCPUserInfoQuery();
  const userCoordinates = { lat: hardcodedUser.lat, lon: hardcodedUser.lon };
  const [isLoadingUserCoords, setIsLoadingUserCoords] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const routingControlRef = useRef<any>(null);

  // Optionally, fetch user coordinates if you want to show user location
  useEffect(() => {
    const fetchUserCoordinates = async () => {
      if (userCPInfo?.data?.address) {
        setIsLoadingUserCoords(true);
        try {
          // You can hardcode or use your backend geocoding here if desired
          // For now, skip geocoding and don't show user marker if not needed
        } catch (error) {
          setError("Could not determine your location. Please check your address in your profile.");
        } finally {
          setIsLoadingUserCoords(false);
        }
      }
    };
    fetchUserCoordinates();
  }, [userCPInfo]);

  // Ensure leaflet-routing-machine is loaded on client
  useEffect(() => {
    if (typeof window !== "undefined" && L && !L.Routing) {
      try {
        require("leaflet-routing-machine");
      } catch (e) {
        console.error("Leaflet Routing Machine could not be loaded.", e);
      }
    }
  }, []);

  // Handle specialist click for routing
  const handleSpecialistClick = (specialistCoords: { lat: number; lon: number }) => {
    if (typeof window === "undefined" || !L || !mapRef.current || !userCoordinates) {
      return;
    }
    if (!L.Routing) {
      try {
        require("leaflet-routing-machine");
      } catch (e) {
        console.error("Leaflet Routing Machine could not be loaded.", e);
        return;
      }
    }
    if (routingControlRef.current) {
      routingControlRef.current.remove();
    }
    if (L.Routing && L.Routing.control) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userCoordinates.lat, userCoordinates.lon),
          L.latLng(specialistCoords.lat, specialistCoords.lon),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
        },
        showAlternatives: false,
        collapsible: true,
        createMarker: function(i: number, waypoint: any, n: number) {
          // Only show the user marker (start), not the end marker (specialist)
          if (i === 0) {
            return L.marker(waypoint.latLng, {
              icon: createCustomIcon("/images/blue-pin.png"),
            });
          }
          // No marker for the end (specialist) point
          return null;
        },
      }).addTo(mapRef.current);
    } else {
      console.error("Leaflet Routing Machine is not loaded.");
    }
  };

  const isLoading = isLoadingUserInfo || isLoadingUserCoords;
  const defaultCenter: [number, number] = [hardcodedSpecialist.lat, hardcodedSpecialist.lon];

  return (
    <Box sx={{ background: "#f5f7fa", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <HeaderContent />
      <Container maxWidth={false} sx={{ mt: 4, mb: 2, px: 0 }}>
        <Typography variant="h4" align="center" fontWeight={700} sx={{ color: "#000", fontSize: { xs: 28, md: 36 }, mb: 2 }}>
          Find Specialists Near You
        </Typography>
        <Box display="flex" justifyContent="center" mb={4} gap={2}>
          <Link href="/specialist-page" passHref legacyBehavior>
            <Button
              sx={{
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 1,
                fontSize: 18,
                background: "#fff",
                color: "#000",
                border: "2px solid #000",
                boxShadow: "none",
                "&:hover": { background: "#f5f5f5", color: "#000", border: "2px solid #000", boxShadow: "none" },
              }}
            >
              Browse Specialists
            </Button>
          </Link>
        </Box>
        <Box sx={{ height: "70vh", width: "100%", borderRadius: 4, overflow: "hidden", boxShadow: 3 }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Alert severity="error">{error}</Alert>
            </Box>
          ) : (
            <MapContainer
              center={defaultCenter}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[hardcodedUser.lat, hardcodedUser.lon] as [number, number]}
                icon={createCustomIcon("/images/blue-pin.png")}
              >
                <Popup>
                  <strong>Your Location</strong>
                  <br />
                  {hardcodedUser.address}
                </Popup>
              </Marker>
              <Marker
                position={[hardcodedSpecialist.lat, hardcodedSpecialist.lon] as [number, number]}
                icon={createCustomIcon("/images/red-pin.png")}
                eventHandlers={{
                  click: () => handleSpecialistClick({ lat: hardcodedSpecialist.lat, lon: hardcodedSpecialist.lon }),
                }}
              >
                <Popup>
                  <strong>{hardcodedSpecialist.name}</strong>
                  <br />
                  <strong>Specialties:</strong> {hardcodedSpecialist.specialties}
                  <br />
                  <strong>Expertise:</strong> {hardcodedSpecialist.expertise}
                  <br />
                  <strong>Address:</strong> {hardcodedSpecialist.address}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSpecialistClick({ lat: hardcodedSpecialist.lat, lon: hardcodedSpecialist.lon })}
                    sx={{ mt: 1 }}
                  >
                    Get Directions
                  </Button>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: "#000", mb: 2 }}>
            Map Legend
          </Typography>
          <Box display="flex" justifyContent="center" gap={4} alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                component="img"
                src="/images/blue-pin.png"
                sx={{ width: 20, height: 20 }}
                alt="Your location"
              />
              <Typography>Your Location</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                component="img"
                src="/images/red-pin.png"
                sx={{ width: 20, height: 20 }}
                alt="Specialist location"
              />
              <Typography>Specialist Location</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "#666", maxWidth: 600, mx: "auto" }}>
            Only showing one specialist for demonstration purposes.
          </Typography>
        </Box>
      </Container>
      <FooterContent />
    </Box>
  );
}

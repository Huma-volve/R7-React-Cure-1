import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import L from "leaflet";
import Button from "../../components/common/Button";
import { FaMapMarkerAlt, FaRedo } from "react-icons/fa";
import { getNearestDoctors } from "../../featuers/apis/doctorApi";

type DoctorLocation = {
  id: number | string;
  name: string;
  specialization: string;
  latitude: number;
  longitude: number;
};

const MapPage = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");
  const [doctors, setDoctors] = useState<DoctorLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);

  const userIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
        className: "user-marker-icon",
      }),
    []
  );

  const doctorIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/4320/4320384.png",
        iconSize: [35, 35],
        className: "doctor-marker-icon",
      }),
    []
  );

  const fetchReverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "CureApp/1.0 (contact@cureapp.example)",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch address");
      const data = await response.json();
      setAddress(data.display_name ?? "Unknown location");
    } catch (err) {
      console.error("Reverse geocode failed:", err);
      setAddress("Unable to determine address");
    }
  }, []);

  const fetchNearestDoctors = useCallback(async (lat: number, lng: number) => {
    setLoadingDoctors(true);
    try {
      const response = await getNearestDoctors(lat, lng);
      const payload = response?.data?.data ?? response?.data ?? [];
      setDoctors(
        (payload as DoctorLocation[]).filter(
          (doc) => typeof doc.latitude === "number" && typeof doc.longitude === "number"
        )
      );
    } catch (err) {
      console.error("Error fetching nearest doctors:", err);
      setError("Unable to load nearby doctors. Please try again later.");
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setError(null);
        setLoadingLocation(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("We couldn't access your location. Please enable location services.");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 20000 }
    );
  }, []);

  useEffect(() => {
    if (!position) return;

    const [lat, lng] = position;
    let cancelled = false;

    const loadData = async () => {
      await Promise.allSettled([
        fetchReverseGeocode(lat, lng),
        fetchNearestDoctors(lat, lng),
      ]);
      if (cancelled) return;
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [position, fetchNearestDoctors, fetchReverseGeocode]);

  const handleRetry = () => {
    setError(null);
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setLoadingLocation(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("We couldn't access your location. Please enable location services.");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 20000 }
    );
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-2xl p-3 z-[1000] w-[90%] flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Current location</p>
          <p className="text-blue-600 text-sm flex items-center gap-1">
            <FaMapMarkerAlt />{" "}
            {loadingLocation ? "Detecting location..." : address || "Location unavailable"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRetry}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Retry locating"
          aria-label="Retry locating"
        >
          <FaRedo />
        </button>
      </div>

      {error && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 z-[1000] w-[90%] text-center">
          {error}
        </div>
      )}

      {position ? (
        <MapContainer
          center={position}
          zoom={14}
          className="h-full w-full z-0"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position} icon={userIcon}>
            <Popup>Your location</Popup>
          </Marker>

          {doctors.map((doc) => (
            <Marker
              key={doc.id ?? `${doc.latitude}-${doc.longitude}`}
              position={[doc.latitude, doc.longitude]}
              icon={doctorIcon}
            >
              <Popup>
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-gray-800">{doc.name ?? "Doctor"}</h3>
                  <p className="text-sm text-gray-600">
                    {doc.specialization ?? "General Practitioner"}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-50">
          <p className="text-gray-500">
            {loadingLocation
              ? "Loading map..."
              : "We need your location to show nearby doctors."}
          </p>
        </div>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%]">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loadingLocation || !position || loadingDoctors}
        >
          {loadingDoctors ? "Loading nearby doctors..." : "Confirm location"}
        </Button>
      </div>
    </div>
  );
};

export default MapPage;

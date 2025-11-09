import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import Button from "../../components/common/Button";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getNearestDoctors } from "../../featuers/apis/doctorApi";

const MapPage = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");
  const [doctors, setDoctors] = useState<any[]>([]);

  // Map icons
  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  const doctorIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4320/4320384.png",
    iconSize: [35, 35],
  });

  // get user location and nearest doctors
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // OpenStreetMap
        try {
          const response = await getNearestDoctors(latitude, longitude);
          console.log("Nearest Doctors API Response:", response.data);
          setDoctors(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching nearest doctors:", error);
        }


        // get nearest doctors
        try {
          const response = await getNearestDoctors(latitude, longitude);
          setDoctors(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching nearest doctors:", error);
        }
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Title above the map */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-2xl p-3 z-[1000] w-[90%] flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Current location</p>
          <p className="text-blue-600 text-sm flex items-center gap-1">
            <FaMapMarkerAlt /> {address || "Fetching location..."}
          </p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">🔍</button>
      </div>

      {/* Map */}
      {position && (
        <MapContainer
          center={position}
          zoom={15}
          className="h-full w-full z-0"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/*user marker */}
          <Marker position={position} icon={userIcon}>
            <Popup>Your location</Popup>
          </Marker>

          {/* doctors from API */}
          {doctors.map((doc) => (
            <Marker
              key={doc.id || `${doc.latitude}-${doc.longitude}`}
              position={[doc.latitude, doc.longitude]}
              icon={doctorIcon}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Confirm button */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%]">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
          Confirm location
        </Button>
      </div>
    </div>
  );
};

export default MapPage;

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import Button from "../../components/common/Button"; 
import { FaMapMarkerAlt } from "react-icons/fa";

const MapPage = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>("");

  // أيقونة الدكتور أو الموقع الحالي
  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  // جلب الموقع الحالي
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // نجيب العنوان (اختياري)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        setAddress(data.display_name);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* العنوان فوق الخريطة */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-2xl p-3 z-[1000] w-[90%] flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Current location</p>
          <p className="text-blue-600 text-sm flex items-center gap-1">
            <FaMapMarkerAlt /> {address || "Fetching location..."}
          </p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">🔍</button>
      </div>

      {/* الخريطة */}
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

          {/* موقع المستخدم */}
          <Marker position={position} icon={markerIcon}>
            <Popup>Your location</Popup>
          </Marker>

          {/* دكاترة من الباك */}
          {/* افترض إنك جايبة من الباك doctors = [{lat, lon, name}, ...] */}
          {/* {doctors.map((d) => (
            <Marker key={d.id} position={[d.lat, d.lon]} icon={doctorIcon}>
              <Popup>{d.name}</Popup>
            </Marker>
          ))} */}
        </MapContainer>
      )}

      {/* زر تأكيد */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%]">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
          Confirm location
        </Button>
      </div>
    </div>
  );
};

export default MapPage;

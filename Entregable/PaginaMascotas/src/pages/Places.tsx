import React, { useState } from "react";
import { Filter, LocateFixed, Star, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Lista de clínicas, con latitud/longitud para Huánuco y Cusco
const clinics = [
  // Huánuco
  { id: 1, name: "Centro Veterinario Elite", premium: true, rating: 4.9, reviews: 186, distance: "1.2 km", address: "Av. Principal 123, Huánuco", services: ["Consultas", "Cirugía", "Baños"], extraServices: 3, open: true, latitude: -9.9295, longitude: -76.2427 },
  { id: 2, name: "Clínica Huellitas", premium: false, rating: 4.7, reviews: 124, distance: "2.4 km", address: "Calle Secundaria 456, Huánuco", services: ["Vacunación", "Hospedaje"], extraServices: 1, open: true, latitude: -9.9278, longitude: -76.2450 },
  { id: 3, name: "Hospital 24h PetCare", premium: true, rating: 4.9, reviews: 215, distance: "3.7 km", address: "Av. Central 789, Huánuco", services: ["Emergencias", "Cirugía", "Hospitalización"], extraServices: 3, open: true, latitude: -9.9310, longitude: -76.2480 },
  { id: 4, name: "Veterinaria Como Perro y Gato", premium: false, rating: 4.6, reviews: 78, distance: "0.5 km", address: "Jirón Crespo Castillo 390, Huánuco", services: ["Consultas", "Vacunación", "Cirugía"], extraServices: 2, open: true, latitude: -9.9300, longitude: -76.2500 },
  { id: 5, name: "Veterinaria MisterCan", premium: false, rating: 4.4, reviews: 53, distance: "1.1 km", address: "Via Colectora, Amarilis 10002, Huánuco", services: ["Profilaxis", "Baños", "Hospitalización"], extraServices: 1, open: true, latitude: -9.9335, longitude: -76.2415 },
  { id: 6, name: "Animal Home Clínica Veterinaria", premium: false, rating: 4.5, reviews: 89, distance: "0.8 km", address: "Jr. Leoncio Prado 733, Huánuco", services: ["Emergencias", "Ecografía", "Radiografía"], extraServices: 2, open: true, latitude: -9.9340, longitude: -76.2470 },
  { id: 7, name: "Clínica Veterinaria Don Perro", premium: false, rating: 4.3, reviews: 102, distance: "0.7 km", address: "Jirón Dos de Mayo 600, Huánuco", services: ["24h Emergencias", "Cirugía"], extraServices: 0, open: true, latitude: -9.9330, longitude: -76.2380 },
  { id: 8, name: "Clínica Veterinaria Huánuco", premium: true, rating: 4.8, reviews: 142, distance: "0.2 km", address: "Jr. Huallayco 1130, Huánuco", services: ["Consultas", "Cirugía", "Baños", "Farmacia"], extraServices: 3, open: true, latitude: -9.9332, longitude: -76.2420 },
  // Cusco
  { id: 9, name: "Veterinaria San Francisco", premium: false, rating: 4.6, reviews: 110, distance: "0.4 km", address: "Calle San Francisco 45, Cusco", services: ["Consultas", "Vacunación", "Cirugía"], extraServices: 2, open: true, latitude: -13.5319, longitude: -71.9675 },
  { id: 10, name: "Clínica Veterinaria Imperial", premium: true, rating: 4.9, reviews: 200, distance: "0.8 km", address: "Av. El Sol 123, Cusco", services: ["Emergencias", "Hospitalización", "Cirugía"], extraServices: 3, open: true, latitude: -13.5189, longitude: -71.9781 },
  { id: 11, name: "VetCare Cusco", premium: false, rating: 4.7, reviews: 150, distance: "1.0 km", address: "Jr. Garcilaso 567, Cusco", services: ["Baños", "Perfilaxis", "Radiografía"], extraServices: 1, open: true, latitude: -13.5207, longitude: -71.9755 },
];

// Centros de cada ciudad
const cityCenters: Record<string, [number, number]> = {
  huanuco: [-9.9332, -76.2427],
  cusco: [-13.5216, -71.9675],
};

// Normaliza texto (sin tildes, minúsculas)
const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Componente para actualizar vista del mapa
function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function Places() {
  const [search, setSearch] = useState<string>("");
  const [filteredClinics, setFilteredClinics] = useState<typeof clinics>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    const trimmed = query.trim();
    if (trimmed === "") {
      setFilteredClinics([]);
    } else {
      const normQuery = normalize(trimmed);
      // Definir centro de búsqueda si es ciudad conocida
      if (cityCenters[normQuery]) setMapCenter(cityCenters[normQuery]);
      // Filtrar clínicas
      const result = clinics.filter((c) => {
        const normAddress = normalize(c.address);
        const normName = normalize(c.name);
        return normAddress.includes(normQuery) || normName.includes(normQuery);
      });
      setFilteredClinics(result);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gradient-to-br from-green-50 to-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 p-6 bg-white/80 backdrop-blur-md shadow-xl overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">🐾 PetCare Locator</h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar por ciudad (e.g., Huanuco o Cusco)"
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-xl">
            <Filter className="w-5 h-5 text-gray-600" aria-label="Filtrar" />
          </button>
          <button className="p-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 flex items-center gap-1">
            <LocateFixed className="w-5 h-5" />
            <span className="text-sm hidden md:inline">Mi ubicación</span>
          </button>
        </div>

        {search.trim() === "" ? (
          <p className="text-sm text-gray-600">Escribe una ciudad para comenzar la búsqueda.</p>
        ) : filteredClinics.length === 0 ? (
          <p className="text-sm text-gray-600">No se encontraron clínicas en "{search}".</p>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-2">{filteredClinics.length} resultados encontrados</p>
            <p className="text-sm text-gray-500 mb-4">Ordenados por: <span className="font-medium text-gray-700">Calificación</span></p>
            <div className="space-y-4">
              {filteredClinics.sort((a, b) => b.rating - a.rating).map((clinic) => (
                <motion.div
                  key={clinic.id}
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition border"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {clinic.premium && (<span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">PREMIUM</span>)}
                      <h2 className="text-lg font-semibold text-gray-800">{clinic.name}</h2>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${clinic.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{clinic.open ? "ABIERTO" : "CERRADO"}</span>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                    <Star className="w-4 h-4 fill-yellow-500" />{clinic.rating}
                    <span className="text-gray-500">• {clinic.reviews} reseñas • {clinic.distance}</span>
                  </div>

                  <p className="flex items-center gap-1 text-gray-600 mt-1 text-sm">
                    <MapPin className="w-4 h-4" /> {clinic.address}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {clinic.services.map((s,i)=><span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">{s}</span>)}
                    {clinic.extraServices>0&&<span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-500">+{clinic.extraServices}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* Mapa */}
      <div className="w-full lg:w-2/3 relative bg-gray-100">
        {filteredClinics.length > 0 && (
          <MapContainer center={mapCenter} zoom={13} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Recenter center={mapCenter} />
            {filteredClinics.map((clinic) => (
              <Marker key={clinic.id} position={[clinic.latitude, clinic.longitude]}>
                <Popup>
                  <div className="font-semibold">{clinic.name}</div>
                  <div className="text-sm">{clinic.address}</div>
                  <div className="text-sm">Rating: {clinic.rating} ⭐</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
        {/* leyenda */}
      </div>
    </div>
  );
}
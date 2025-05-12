
import React, { useState } from "react";
import { Filter, LocateFixed, Star, MapPin, X, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

// ... (interface Clinic y array clinics siguen igual)

type Clinic = {
  id: number;
  name: string;
  premium?: boolean;
  rating?: number;
  reviews?: number;
  distance?: string;
  address: string;
  services?: string[];
  extraServices?: number;
  open?: boolean;
  latitude?: number | null;
  longitude?: number | null;
};

// Array completo de clínicas
const clinics: Clinic[] = [
  // ----- HUÁNUCO -----
  { id: 1,  name: "Clínica Veterinaria Don Perro",      address: "Jirón Dos de Mayo 614, Huánuco, Perú",       latitude: -9.933000, longitude: -76.238000, premium: false, rating: 4.3, reviews: 102, distance: "0.7 km", services: ["Cirugía","Emergencias"], extraServices: 0, open: true },
  { id: 2,  name: "Clínica Veterinaria San Roque",      address: "Jr. 28 de Julio 325, Huánuco, Perú",         latitude: -9.931200, longitude: -76.244500, premium: false, rating: 4.5, reviews: 95,  distance: "1.0 km", services: ["Consultas","Radiografía"], extraServices: 0, open: true },
  { id: 3,  name: "Clínica Veterinaria Cuatro Patas",   address: "Jr. 28 de Julio 620, Huánuco, Perú",         latitude: -9.933800, longitude: -76.242500, premium: false, rating: 4.2, reviews: 60,  distance: "1.5 km", services: ["Baños","Baños"], extraServices: 0, open: true },
  { id: 4,  name: "Veterinaria Spyke Vet",              address: "Jirón Dámaso Beraún 619, Huánuco, Perú",     latitude: -9.932900, longitude: -76.241900, premium: false, rating: 4.1, reviews: 45,  distance: "2.0 km", services: ["Vacunación","Consultas"], extraServices: 0, open: true },
  { id: 5,  name: "Veterinaria Huellitas",              address: "Tacna 110, Amarilis, Huánuco, Perú",         latitude: -9.929800, longitude: -76.246000, premium: false, rating: 4.7, reviews: 124, distance: "2.4 km", services: ["Vacunación","Hospedaje"], extraServices: 1, open: true },
  { id: 6,  name: "Clínica Veterinaria K9",             address: "Vía Colectora Urb. San Francisco Mz B Lt 10, Amarilis, Perú", latitude: -9.930500, longitude: -76.240800, premium: false, rating: 4.3, reviews: 70, distance: "1.8 km", services: ["Profilaxis","Baños"], extraServices: 1, open: true },
  { id: 7, name: "Veterinaria Vet ARVA",               address: "Jirón Hermilio Valdizán 626, Huánuco, Perú", longitude: -76.247200, latitude: -9.934200, premium: false, rating: 4.5, reviews: 90, distance: "0.9 km", services: ["Consultas","Ecografía"], extraServices: 2, open: true },
  { id: 8, name: "Clínica Veterinaria COMO REYES",     address: "Av. Universitaria 1021, Pillco Marca, Huánuco, Perú", latitude: -9.936000, longitude: -76.239000, premium: false, rating: 4.2, reviews: 68, distance: "1.3 km", services: ["Cirugía","Hospitalización"], extraServices: 1, open: true },
  { id: 9, name: "Dr. Marco – Centro Veterinario",     address: "Jr. Independencia 359, Huánuco, Perú",     latitude: -9.931500, longitude: -76.245500, premium: false, rating: 4.4, reviews: 80, distance: "1.1 km", services: ["Consultas","Radiografía"], extraServices: 1, open: true },
  { id: 10, name: "Veterinaria Portella",               address: "Jr. Abtao 410, Huánuco, Perú",             latitude: -9.929200, longitude: -76.244200, premium: false, rating: 4.3, reviews: 75, distance: "2.2 km", services: ["Baños","Vacunación"], extraServices: 0, open: true },
  { id: 11, name: "Clínica Veterinaria Los Portales",   address: "Mz. I Lt Calle 1, Amarilis, Huánuco, Perú", latitude: -9.933900, longitude: -76.243500, premium: false, rating: 4.1, reviews: 60, distance: "1.6 km", services: ["Consultas","Farmacia"], extraServices: 1, open: true },
  { id: 12, name: "Clínica Veterinaria Kanino",         address: "Av. Girasoles 838, Amarilis, Huánuco, Perú", latitude: -9.931800, longitude: -76.241200, premium: false, rating: 4.2, reviews: 65, distance: "1.0 km", services: ["Emergencias","Consultas"], extraServices: 1, open: true },
  { id: 13, name: "Clínica Veterinaria TOCTO",          address: "Jr. 28 de Julio 126, Pillco Marca, Huánuco, Perú", latitude: -9.937000, longitude: -76.240000, premium: false, rating: 4.1, reviews: 50, distance: "2.5 km", services: ["Baños","Hospitalización"], extraServices: 2, open: true },
  { id: 14, name: "Veterinaria Rikayvet",               address: "Jr. Ciro Alegría Mz-E1 Lt 4B, San Luis, Amarilis, Perú", latitude: -9.930200, longitude: -76.239500, premium: false, rating: 4.3, reviews: 72, distance: "1.9 km", services: ["Radiografía","Consultas"], extraServices: 0, open: true },
  // ----- CUSCO -----
  { id: 15, name: "Veterinaria San Francisco",          address: "Calle San Francisco 45, Cusco, Perú",       latitude: -13.531900, longitude: -71.967500, premium: false, rating: 4.6, reviews: 110, distance: "0.4 km", services: ["Consultas","Vacunación","Cirugía"], extraServices: 2, open: true },
  { id: 16, name: "Clínica Veterinaria Imperial",       address: "Av. El Sol 123, Cusco, Perú",               latitude: -13.518900, longitude: -71.978100, premium: true,  rating: 4.9, reviews: 200, distance: "0.8 km", services: ["Emergencias","Hospitalización","Cirugía"], extraServices: 3, open: true },
  { id: 17, name: "VetCare Cusco",                     address: "Jr. Garcilaso 567, Cusco, Perú",            latitude: -13.520700, longitude: -71.975500, premium: false, rating: 4.7, reviews: 150, distance: "1.0 km", services: ["Baños","Profilaxis","Radiografía"], extraServices: 1, open: true },
// ----- LIMA -----
{ id: 18, name: "Clínica Veterinaria San Borja", address: "Av. San Borja Sur 325, San Borja, Lima, Perú", latitude: -12.101432, longitude: -77.003678, premium: true, rating: 4.9, reviews: 210, distance: "0.6 km", services: ["Consultas", "Cirugía", "Emergencias", "Farmacia"], extraServices: 3, open: true },
{ id: 19, name: "VetLife Perú", address: "Av. La Marina 1580, Pueblo Libre, Lima, Perú", latitude: -12.080402, longitude: -77.075091, premium: false, rating: 4.7, reviews: 130, distance: "1.1 km", services: ["Baños", "Vacunación", "Profilaxis"], extraServices: 1, open: true },
{ id: 20, name: "Clínica Veterinaria Los Olivos", address: "Av. Universitaria 895, Los Olivos, Lima, Perú", latitude: -11.981876, longitude: -77.055445, premium: false, rating: 4.5, reviews: 90, distance: "2.0 km", services: ["Emergencias", "Hospitalización"], extraServices: 2, open: true },
{ id: 21, name: "VetSana", address: "Av. Caminos del Inca 1789, Surco, Lima, Perú", latitude: -12.134211, longitude: -76.988342, premium: false, rating: 4.6, reviews: 75, distance: "0.9 km", services: ["Consultas", "Ecografía"], extraServices: 1, open: true },
{ id: 22, name: "Clínica Veterinaria Pet Center", address: "Av. Angamos Este 1420, Miraflores, Lima, Perú", latitude: -12.115932, longitude: -77.013564, premium: false, rating: 4.4, reviews: 85, distance: "1.3 km", services: ["Cirugía", "Radiografía"], extraServices: 1, open: true },
{ id: 23, name: "VetSalud San Miguel", address: "Av. La Marina 2275, San Miguel, Lima, Perú", latitude: -12.081005, longitude: -77.089812, premium: true, rating: 4.8, reviews: 160, distance: "1.4 km", services: ["Consultas", "Vacunación", "Farmacia"], extraServices: 2, open: true },
{ id: 24, name: "Clínica Veterinaria Huellitas", address: "Jr. Las Orquídeas 213, San Juan de Lurigancho, Lima, Perú", latitude: -12.014567, longitude: -76.999876, premium: false, rating: 4.3, reviews: 70, distance: "1.9 km", services: ["Baños", "Profilaxis"], extraServices: 0, open: true },
{ id: 25, name: "Animal House Vet", address: "Av. Brasil 3450, Magdalena del Mar, Lima, Perú", latitude: -12.089154, longitude: -77.066720, premium: false, rating: 4.5, reviews: 95, distance: "1.2 km", services: ["Consultas", "Emergencias"], extraServices: 1, open: true },

];


// Centros de ciudad para recentrado del mapa
const cityCenters: Record<string, [number, number]> = {
  huanuco: [-9.933216, -76.242117],
  cusco: [-13.5216, -71.9675],
  lima: [-12.0464, -77.0428],
};

// Normaliza textos para búsqueda
const normalize = (str: string) =>
  str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Reposiciona el mapa
function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function Places() {
  const [search, setSearch] = useState<string>("huanuco");
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(cityCenters.huanuco);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    const norm = normalize(query);

    if (cityCenters[norm as keyof typeof cityCenters]) {
      setMapCenter(cityCenters[norm as keyof typeof cityCenters]);
    }

    const results = clinics.filter((c) => {
      return (
        normalize(c.name).includes(norm) ||
        normalize(c.address).includes(norm)
      );
    });

    setFilteredClinics(results);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gradient-to-br from-green-50 to-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 p-6 bg-white/80 backdrop-blur-md shadow-xl overflow-y-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Encuentra Veterinarias Cerca de Ti</h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar por ciudad (e.g., Huánuco o Cusco)"
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-xl">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 flex items-center gap-1">
            <LocateFixed className="w-5 h-5" />
            <span className="text-sm hidden md:inline">Mi ubicación</span>
          </button>
        </div>

        {filteredClinics.length === 0 ? (
          <p className="text-sm text-gray-600">No se encontraron clínicas en "{search}".</p>
        ) : (
          <div className="space-y-4">
            {filteredClinics
              .sort((a, b) => (b.rating || 0) - (a.rating || 0))
              .map((clinic) => (
                <motion.div
                  key={clinic.id}
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition border cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedClinic(clinic)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {clinic.premium && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                          PREMIUM
                        </span>
                      )}
                      <h2 className="text-lg font-semibold text-gray-800">{clinic.name}</h2>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        clinic.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {clinic.open ? "ABIERTO" : "CERRADO"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                    <Star className="w-4 h-4 fill-yellow-500" /> {clinic.rating}
                    <span className="text-gray-500">• {clinic.reviews} reseñas • {clinic.distance}</span>
                  </div>

                  <p className="flex items-center gap-1 text-gray-600 mt-1 text-sm">
                    <MapPin className="w-4 h-4" /> {clinic.address}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {clinic.services?.map((s, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                        {s}
                      </span>
                    ))}
                    {clinic.extraServices! > 0 && (
                      <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-500">
                        +{clinic.extraServices}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </aside>

      {/* Mapa */}
      <div className="w-full lg:w-2/3 relative bg-gray-100">
        {filteredClinics.length > 0 && (
          <MapContainer center={mapCenter} zoom={13} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Recenter center={mapCenter} />
            {filteredClinics
              .filter((c) => typeof c.latitude === "number" && typeof c.longitude === "number")
              .map((clinic) => (
                <Marker key={clinic.id} position={[clinic.latitude!, clinic.longitude!]}>
                  <Popup>
                    <div className="font-semibold">{clinic.name}</div>
                    <div className="text-sm">{clinic.address}</div>
                    <div className="text-sm">Rating: {clinic.rating} ⭐</div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedClinic && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedClinic(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-green-700 mb-2">{selectedClinic.name}</h2>
              <img
                src={`https://source.unsplash.com/400x200/?veterinary,clinic&sig=${selectedClinic.id}`}
                alt="Foto clínica"
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <p className="text-gray-700 mb-2">{selectedClinic.address}</p>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-gray-700 font-medium">{selectedClinic.rating}</span>
                <span className="text-gray-500 text-sm">({selectedClinic.reviews} reseñas)</span>
              </div>

              {/* Botón "Cómo llegar" */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedClinic.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                <Navigation className="w-5 h-5" />
                Cómo llegar
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

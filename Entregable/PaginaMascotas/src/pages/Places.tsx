
import React, { useState } from "react";
import { Filter, LocateFixed, Star, MapPin, X, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

// nombre del mapa OpenStreetMap

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
// ----- AREQUIPA -----
  { id: 26, name: "Clínica Veterinaria Arequipa",      address: "Calle Santa Catalina 300, Arequipa, Perú",       latitude: -16.409000, longitude: -71.535000, premium: false, rating: 4.6, reviews: 110, distance: "0.8 km", services: ["Emergencias", "Consultas"], extraServices: 1, open: true },
  { id: 27, name: "Clínica Veterinaria Los Perros",    address: "Calle San Martín 507, Arequipa, Perú",           latitude: -16.400000, longitude: -71.540000, premium: false, rating: 4.5, reviews: 75,  distance: "1.1 km", services: ["Vacunación", "Radiografía"], extraServices: 1, open: true },
  { id: 28, name: "Veterinaria BestVet",               address: "Jr. Los Nogales 230, Arequipa, Perú",           latitude: -16.394500, longitude: -71.529800, premium: false, rating: 4.4, reviews: 90,  distance: "1.3 km", services: ["Consultas", "Farmacia"], extraServices: 0, open: true },
  { id: 29, name: "Clínica Veterinaria El Canino Feliz", address: "Calle Bolívar 122, Arequipa, Perú",              latitude: -16.392100, longitude: -71.536400, premium: false, rating: 4.3, reviews: 60,  distance: "1.5 km", services: ["Cirugía", "Baños"], extraServices: 1, open: true },

  // ----- TRUJILLO -----
  { id: 30, name: "Clínica Veterinaria Trujillo",      address: "Av. España 150, Trujillo, Perú",                latitude: -8.113500, longitude: -79.029800, premium: false, rating: 4.7, reviews: 130, distance: "0.6 km", services: ["Consultas", "Vacunación"], extraServices: 2, open: true },
  { id: 31, name: "Clínica Veterinaria Los Andes",     address: "Jr. Zepita 720, Trujillo, Perú",               latitude: -8.110200, longitude: -79.033500, premium: false, rating: 4.5, reviews: 95,  distance: "0.9 km", services: ["Emergencias", "Radiografía"], extraServices: 1, open: true },
  { id: 32, name: "Veterinaria Pet House",             address: "Av. Manuel Vera Enríquez 1050, Trujillo, Perú", latitude: -8.110500, longitude: -79.034000, premium: false, rating: 4.6, reviews: 120, distance: "1.2 km", services: ["Profilaxis", "Consultas"], extraServices: 0, open: true },
  { id: 33, name: "Veterinaria Mi Mascota",            address: "Calle Junín 411, Trujillo, Perú",              latitude: -8.111300, longitude: -79.037100, premium: false, rating: 4.4, reviews: 80,  distance: "1.5 km", services: ["Baños", "Farmacia"], extraServices: 1, open: true },

  // ----- PIURA -----
  { id: 34, name: "Clínica Veterinaria Piura",         address: "Calle Libertad 540, Piura, Perú",              latitude: -5.194000, longitude: -80.632000, premium: false, rating: 4.8, reviews: 150, distance: "0.7 km", services: ["Emergencias", "Consultas"], extraServices: 2, open: true },
  { id: 35, name: "Veterinaria Los Amigos",            address: "Av. Panamericana Norte 1020, Piura, Perú",      latitude: -5.192000, longitude: -80.633400, premium: false, rating: 4.7, reviews: 140, distance: "1.1 km", services: ["Baños", "Radiografía"], extraServices: 1, open: true },
  { id: 36, name: "Clínica Veterinaria San Juan",      address: "Jr. Sánchez Cerro 412, Piura, Perú",            latitude: -5.193300, longitude: -80.637500, premium: false, rating: 4.6, reviews: 110, distance: "1.3 km", services: ["Vacunación", "Consultas"], extraServices: 2, open: true },
  { id: 37, name: "Veterinaria El Buen Pastor",        address: "Av. Las Gardenias 120, Piura, Perú",           latitude: -5.190000, longitude: -80.630000, premium: false, rating: 4.5, reviews: 80,  distance: "1.5 km", services: ["Farmacia", "Consultas"], extraServices: 1, open: true },

  // ----- ICA -----
  { id: 38, name: "Clínica Veterinaria de Ica",        address: "Av. San Martín 320, Ica, Perú",                latitude: -13.421500, longitude: -75.726000, premium: false, rating: 4.7, reviews: 115, distance: "0.8 km", services: ["Emergencias", "Consultas"], extraServices: 1, open: true },
  { id: 39, name: "Veterinaria Los Andes",             address: "Calle Perú 404, Ica, Perú",                   latitude: -13.418900, longitude: -75.723200, premium: false, rating: 4.6, reviews: 90,  distance: "1.0 km", services: ["Cirugía", "Vacunación"], extraServices: 2, open: true },
  { id: 40, name: "Clínica Veterinaria Pet Love",       address: "Av. América Sur 540, Ica, Perú",               latitude: -13.416300, longitude: -75.719000, premium: false, rating: 4.5, reviews: 80,  distance: "1.2 km", services: ["Profilaxis", "Consultas"], extraServices: 1, open: true },
  { id: 41, name: "Veterinaria Mis Amigos",            address: "Jr. Bolívar 513, Ica, Perú",                   latitude: -13.418100, longitude: -75.720300, premium: false, rating: 4.4, reviews: 75,  distance: "1.3 km", services: ["Baños", "Farmacia"], extraServices: 0, open: true },

  // ----- CHICLAYO -----
  { id: 42, name: "Clínica Veterinaria Chiclayo",      address: "Calle José Leonardo Ortiz 540, Chiclayo, Perú", latitude: -6.766700, longitude: -79.838800, premium: false, rating: 4.6, reviews: 120, distance: "0.7 km", services: ["Emergencias", "Consultas"], extraServices: 2, open: true },
  { id: 43, name: "Veterinaria PetCenter",             address: "Av. José Abelardo Quiñones 500, Chiclayo, Perú", latitude: -6.768300, longitude: -79.839600, premium: false, rating: 4.7, reviews: 135, distance: "0.9 km", services: ["Vacunación", "Radiografía"], extraServices: 1, open: true },
  { id: 44, name: "Clínica Veterinaria Los Pinos",     address: "Calle Las Américas 680, Chiclayo, Perú",         latitude: -6.767100, longitude: -79.841200, premium: false, rating: 4.5, reviews: 110, distance: "1.1 km", services: ["Consultas", "Farmacia"], extraServices: 0, open: true },
  { id: 45, name: "Veterinaria El Buen Gato",          address: "Jr. Cuzco 520, Chiclayo, Perú",                 latitude: -6.765000, longitude: -79.840400, premium: false, rating: 4.4, reviews: 80,  distance: "1.4 km", services: ["Baños", "Profilaxis"], extraServices: 1, open: true },
 // ----- PASCO -----
  { id: 46, name: "Clínica Veterinaria Pasco",        address: "Jr. 28 de Julio 400, Pasco, Perú",            latitude: -10.599500, longitude: -76.202200, premium: false, rating: 4.6, reviews: 85, distance: "0.7 km", services: ["Consultas", "Vacunación"], extraServices: 1, open: true },
  { id: 47, name: "Veterinaria La Estrella",          address: "Av. Libertad 250, Pasco, Perú",               latitude: -10.600200, longitude: -76.204000, premium: false, rating: 4.5, reviews: 70,  distance: "1.0 km", services: ["Emergencias", "Farmacia"], extraServices: 0, open: true },
  { id: 48, name: "Clínica Veterinaria Los Andes",     address: "Calle Sucre 300, Pasco, Perú",               latitude: -10.597800, longitude: -76.199500, premium: false, rating: 4.7, reviews: 110, distance: "1.2 km", services: ["Baños", "Profilaxis"], extraServices: 2, open: true },
  { id: 49, name: "Veterinaria Mis Mascotas",         address: "Calle Manuel Gonzales 150, Pasco, Perú",     latitude: -10.598000, longitude: -76.200800, premium: false, rating: 4.4, reviews: 95,  distance: "1.3 km", services: ["Consultas", "Radiografía"], extraServices: 1, open: true },

  // ----- HUANCAYO -----
  { id: 50, name: "Clínica Veterinaria Huancayo",      address: "Av. Ferrocarril 500, Huancayo, Perú",        latitude: -12.068300, longitude: -75.204400, premium: false, rating: 4.8, reviews: 180, distance: "0.5 km", services: ["Consultas", "Vacunación"], extraServices: 2, open: true },
  { id: 51, name: "Veterinaria El Buen Amigo",        address: "Jr. San Martín 250, Huancayo, Perú",         latitude: -12.067000, longitude: -75.206000, premium: false, rating: 4.7, reviews: 160, distance: "0.8 km", services: ["Emergencias", "Farmacia"], extraServices: 1, open: true },
  { id: 52, name: "Clínica Veterinaria La Casa de los Animales", address: "Calle Comercio 300, Huancayo, Perú", latitude: -12.070000, longitude: -75.205500, premium: false, rating: 4.6, reviews: 120, distance: "1.0 km", services: ["Consultas", "Baños"], extraServices: 0, open: true },
  { id: 53, name: "Veterinaria Sonrisas",             address: "Av. Ricardo Palma 450, Huancayo, Perú",      latitude: -12.069500, longitude: -75.207100, premium: false, rating: 4.5, reviews: 100, distance: "1.2 km", services: ["Radiografía", "Consultas"], extraServices: 1, open: true },

];


// Centros de ciudad para recentrado del mapa
const cityCenters: Record<string, [number, number]> = {
 amazonas: [-6.2310, -77.8700],       // Chachapoyas
  ancash: [-9.5278, -77.5287],         // Huaraz
  apurimac: [-13.6333, -72.8833],      // Abancay
  arequipa: [-16.3989, -71.5350],      // Arequipa
  ayacucho: [-13.1588, -74.2239],      // Ayacucho
  cajamarca: [-7.1500, -78.5167],      // Cajamarca
  callao: [-12.0500, -77.1333],        // Callao
  cusco: [-13.5319, -71.9675],         // Cusco
  huancavelica: [-12.7861, -74.9769],  // Huancavelica
  huanuco: [-9.9306, -76.2422],        // Huánuco
  ica: [-14.0681, -75.7256],           // Ica
  huancayo: [-12.0691, -75.2023],         // Huancayo
  trujillo: [-8.1119, -79.0288],    // Trujillo
  lambayeque: [-6.7714, -79.8409],     // Chiclayo
  lima: [-12.0464, -77.0428],          // Lima
  loreto: [-3.7491, -73.2538],         // Iquitos
  moquegua: [-17.1947, -70.9350],      // Moquegua
  pasco: [-10.6864, -76.2560],         // Cerro de Pasco
  piura: [-5.1945, -80.6328],          // Piura
  puno: [-15.8402, -70.0219],          // Puno
  san_martin: [-6.4926, -76.3652],     // Moyobamba
  tacna: [-18.0066, -70.2463],         // Tacna
  tumbes: [-3.5669, -80.4515],         // Tumbes
  ucayali: [-8.3791, -74.5539],        // Pucallpa
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

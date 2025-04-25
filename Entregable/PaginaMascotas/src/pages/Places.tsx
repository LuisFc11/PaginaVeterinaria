import { useState } from "react";
import { MapPin, Star, Filter, LocateFixed } from "lucide-react";
import { motion } from "framer-motion";

const clinics = [
  {
    name: "Centro Veterinario Elite",
    premium: true,
    rating: 4.9,
    reviews: 186,
    distance: "1.2 km",
    address: "Av. Principal 123, Ciudad",
    services: ["Consultas", "Cirugía", "Baños"],
    extraServices: 3,
    open: true,
  },
  {
    name: "Clínica Huellitas",
    premium: false,
    rating: 4.7,
    reviews: 124,
    distance: "2.4 km",
    address: "Calle Secundaria 456, Ciudad",
    services: ["Vacunación", "Hospedaje"],
    extraServices: 1,
    open: true,
  },
  {
    name: "Hospital 24h PetCare",
    premium: true,
    rating: 4.9,
    reviews: 215,
    distance: "3.7 km",
    address: "Av. Central 789, Ciudad",
    services: ["Emergencias", "Cirugía", "Hospitalización"],
    extraServices: 3,
    open: true,
  },
];

export default function Places() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gradient-to-br from-green-50 to-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 p-6 bg-white/80 backdrop-blur-md shadow-xl overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">🐾 PetCare Locator</h1>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Buscar clínicas o servicios"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        <p className="text-sm text-gray-600 mb-2">5 resultados encontrados</p>
        <p className="text-sm text-gray-500 mb-4">Ordenados por: <span className="font-medium text-gray-700">Calificación</span></p>

        <div className="space-y-4">
          {clinics.map((clinic, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition border"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {clinic.premium && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">PREMIUM</span>
                  )}
                  <h2 className="text-lg font-semibold text-gray-800">{clinic.name}</h2>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${clinic.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {clinic.open ? "ABIERTO" : "CERRADO"}
                </span>
              </div>

              <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                <Star className="w-4 h-4 fill-yellow-500" />
                {clinic.rating}
                <span className="text-gray-500">• {clinic.reviews} reseñas • {clinic.distance}</span>
              </div>

              <p className="flex items-center gap-1 text-gray-600 mt-1 text-sm">
                <MapPin className="w-4 h-4" /> {clinic.address}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {clinic.services.map((s, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">{s}</span>
                ))}
                {clinic.extraServices > 0 && (
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-500">+{clinic.extraServices}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* Mapa */}
      <div className="w-full lg:w-2/3 relative flex items-center justify-center bg-gray-100">
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-lg p-3 shadow-lg text-sm space-y-2">
          <p className="flex items-center gap-2"><span className="w-3 h-3 bg-green-600 rounded-full inline-block"></span> Premium</p>
          <p className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-600 rounded-full inline-block"></span> Estándar</p>
        </div>
        <div className="text-gray-400 text-xl font-medium">[ Mapa interactivo aquí 📍 ]</div>
      </div>
    </div>
  );
}

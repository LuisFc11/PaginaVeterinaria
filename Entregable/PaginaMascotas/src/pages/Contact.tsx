import { useEffect, useState } from "react";
import { MapPin, ShowerHead, Stethoscope, PawPrint } from "lucide-react";

interface Lugar {
  id: number;
  nombre: string;
  direccion: string;
  servicio: string;
}

const Contact = () => {
  const [lugares, setLugares] = useState<Lugar[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/lugares")
      .then((res) => res.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error al obtener lugares", error));
  }, []);

  return (
    <section id="services" className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600">Veterinarias Más Cercanas</h1>
        <p className="text-gray-600 mt-2">
          Cuidado, limpieza y atención para tu mascota
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lugares.map((lugar) => (
          <div
            key={lugar.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {/* Imagen de ejemplo o puedes usar una real si tienes el campo */}
            <img
              src="https://place-puppy.com/400x200"
              alt={lugar.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{lugar.nombre}</h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {lugar.direccion}
              </div>
              <ul className="mt-4 space-y-1 text-gray-700">
                <li className="flex items-center">
                  {lugar.servicio.toLowerCase().includes("baño") ? (
                    <ShowerHead className="h-4 w-4 mr-2 text-indigo-500" />
                  ) : lugar.servicio.toLowerCase().includes("consulta") ||
                    lugar.servicio.toLowerCase().includes("chequeo") ? (
                    <Stethoscope className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <PawPrint className="h-4 w-4 mr-2 text-pink-500" />
                  )}
                  {lugar.servicio}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;

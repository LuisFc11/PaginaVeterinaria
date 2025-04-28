import React from 'react';  
import { MapPin, PawPrint, ShowerHead, Stethoscope } from 'lucide-react';

const vetClinics = [
  {
    name: 'Veterinaria Patitas Felices',
    location: 'Av. Principal 123, Lima',
    services: ['Cuidado', 'Baño', 'Consulta veterinaria'],
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
  },
  {
    name: 'Clínica Huellitas',
    location: 'Calle Central 456, Cusco',
    services: ['Vacunación', 'Baño', 'Cirugías menores'],
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1ba3c8e',
  },
  {
    name: 'Pet Life Center',
    location: 'Jr. San Martín 789, Arequipa',
    services: ['Guardería', 'Baño', 'Chequeo general'],
    image: 'https://images.unsplash.com/photo-1601758123927-196d7be3c685',
  },
  {
    name: 'Perros malos xd',
    location: 'Jr. San Martín 789, Arequipa',
    services: ['Guardería', 'Baño', 'Chequeo general'],
    image: 'https://images.unsplash.com/photo-1601758123927-196d7be3c685',
  },
];

function Home() {
  return (
    <main className="w-full bg-gray-50" id="Home">
      {/* Sección Hero */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url('https://cdn.unotv.com/images/2024/06/perro-pasea-con-un-cuchillo-en-la-boca-jpg-143903.jpg')",
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 max-w-3xl text-white p-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Dónde dejar a tu mascota cuando no puedes cuidarla?
          </h2>
          <p className="text-lg mb-6">
            En PetCare cuidamos de tu mascota como si fuera nuestra. 🐶🐱
          </p>
          <a href="#services">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition">
              Conócenos
            </button>
          </a>
        </div>
      </section>

      {/* Sección de veterinarias */}
      <section id="services" className="min-h-screen bg-gray-50 p-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-600">Encuentra Veterinarias Cercanas</h1>
          <p className="text-gray-600 mt-2">
            Cuidado, limpieza y atención para tu mascota
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vetClinics.map((clinic, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img src={clinic.image} alt={clinic.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{clinic.name}</h2>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {clinic.location}
                </div>
                <ul className="mt-4 space-y-1 text-gray-700">
                  {clinic.services.map((service, i) => (
                    <li key={i} className="flex items-center">
                      {service.toLowerCase().includes('baño') ? (
                        <ShowerHead className="h-4 w-4 mr-2 text-indigo-500" />
                      ) : service.toLowerCase().includes('consulta') ||
                        service.toLowerCase().includes('chequeo') ? (
                        <Stethoscope className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <PawPrint className="h-4 w-4 mr-2 text-pink-500" />
                      )}
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de texto + imagen */}
      <section className="flex flex-col items-center justify-center text-center p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ¿Dónde dejar a tu mascota cuando no puedes cuidarla?
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          En PetCare cuidamos de tu mascota como si fuera nuestra. 🐶🐱
        </p>
        <img
          src="https://cdn.unotv.com/images/2024/06/perro-pasea-con-un-cuchillo-en-la-boca-jpg-143903.jpg"
          alt="Mascotas felices"
          className="rounded-lg shadow-lg w-full max-w-md mb-6"
        />
        <a href="#services">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition">
            Conócenos
          </button>
        </a>
      </section>

    </main>
  );
}

export default Home;

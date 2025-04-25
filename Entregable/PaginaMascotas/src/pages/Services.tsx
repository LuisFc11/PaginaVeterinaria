import { PawPrint, Scissors, Stethoscope } from 'lucide-react';

function Services() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6" id="services">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-14">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Servicio 1: Guardería */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group">
            <div className="bg-blue-100 text-blue-600 w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full">
              <PawPrint size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Guardería</h3>
            <p className="text-gray-600 mb-4">Cuidamos a tu mascota mientras tú no puedes. Seguridad y cariño asegurado.</p>
            <span className="text-blue-600 font-semibold text-sm">Desde $10/hora</span>
          </div>

          {/* Servicio 2: Peluquería */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group">
            <div className="bg-pink-100 text-pink-500 w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full">
              <Scissors size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Peluquería</h3>
            <p className="text-gray-600 mb-4">Baños, cortes y peinados con amor y estilo profesional para tu mascota.</p>
            <span className="text-pink-500 font-semibold text-sm">Desde $25</span>
          </div>

          {/* Servicio 3: Veterinaria */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group">
            <div className="bg-green-100 text-green-600 w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full">
              <Stethoscope size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Veterinaria</h3>
            <p className="text-gray-600 mb-4">Consulta, vacunación, chequeos y atención de emergencias con profesionales.</p>
            <span className="text-green-600 font-semibold text-sm">Desde $15</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

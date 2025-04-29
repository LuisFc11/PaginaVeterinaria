import { useEffect, useState } from "react";
import { MapPin, ShowerHead, Stethoscope, PawPrint } from "lucide-react";

interface Lugar {
  id: number;
  nombre: string;
  direccion: string;
  servicio: string;
}

const stats = [
  { id: 1, name: 'Clientes satisfechos', value: '+14 000' },
  { id: 2, name: 'Clientes que confian en nosotros', value: '+ 15 000' },
  { id: 3, name: 'Nuevos usuarios anuales', value: '+1 500' },
]



function Home() {
  const [lugares, setLugares] = useState<Lugar[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/lugares")
      .then((res) => res.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error al obtener lugares", error));
  }, []);

  return (
    <main className="w-full bg-gray-50" id="Home">
      {/* Sección inicio */}
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

      {/* Seccion de pages aliados */}
      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

      {/* Imagenes de los perritos y patitos */}
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap md:-m-2 -m-1 ">
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-1/2 ">
          <img alt="galería" className="w-full object-cover h-full object-center block rounded-lg" src="https://clinicaveterinarium.es/wp-content/uploads/2017/05/perro_y_gato.jpg"/>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="galería" className="w-full object-cover h-full object-center block rounded-lg" src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwYW5kJTIwZG9nfGVufDB8fDB8fHww"/>
        </div>
        <div className="md:p-2 p-1 w-full">
          <img alt="galería" className="w-full h-full object-cover object-center block rounded-lg" src="https://www.universodelasaludanimal.com/wp-content/uploads/sites/61/2021/07/Cacho-e-gato-juntos-no-chao-posando-pra-foto_3.jpg"/>
        </div>
      </div>
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-full">
          <img alt="galería" className="w-full h-full object-cover object-center block rounded-lg" src="https://s1.1zoom.me/big0/95/395959-svetik.jpg"/>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="galería" className="w-full object-cover h-full object-center block rounded-lg" src="https://img.freepik.com/fotos-premium/gato-perro-gatito-abisinio-golden-retriever-mira-derecha_147970-14.jpg?semt=ais_hybrid&w=740"/>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="galería" className="w-full object-cover h-full object-center block rounded-lg" src="https://blog.fridapets.com.mx/wp-content/uploads/2020/11/perro-vs-gato-1.jpg"/>
        </div>
      </div>
    </div>
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

import { Heart } from "lucide-react"; // Asegúrate de importar correctamente los íconos

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      {/* Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-teal-400" />
              <span className="ml-2 text-xl font-bold">CanFiru Veterinaria</span>
            </div>
            <p className="text-gray-400 mb-4">
              Cuidado profesional y compasivo para tu mascota. Más de 15 años de experiencia nos respaldan.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {["Inicio", "Servicios", "Nosotros", "Testimonios", "Contacto"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-teal-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2">
              {["Consulta General", "Vacunación", "Peluquería", "Cirugía", "Emergencias", "Nutrición"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Síguenos</h4>
            <div className="flex space-x-4 mb-4">
              {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                <a key={social} href="#" className="bg-gray-700 hover:bg-teal-600 transition-colors p-2 rounded-full">
                  <span className="sr-only">{social}</span>
                  <div className="h-5 w-5"></div>
                </a>
              ))}
            </div>
            <h4 className="text-lg font-bold mb-4">Suscríbete</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} PetCare Veterinaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

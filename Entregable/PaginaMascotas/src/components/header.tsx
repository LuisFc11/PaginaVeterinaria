import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import CitasModal from "./citasModal";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { name: "Inicio", to: "/" },
    { name: "Servicios", to: "/servicios" },
    { name: "Lugares", to: "/lugares" },
    { name: "Contacto", to: "/contacto" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">CanFiru Veterinaria</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(({ name, to }) => (
                <Link
                  key={name}
                  to={to}
                  className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
                >
                  {name}
                </Link>
              ))}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
              >
                Agendar Cita
              </button>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-3 py-3">
                {navItems.map(({ name, to }) => (
                  <Link
                    key={name}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-teal-600 transition-colors font-medium py-2"
                  >
                    {name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors w-full"
                >
                  Agendar Cita
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal de Cita */}
      <CitasModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Header;

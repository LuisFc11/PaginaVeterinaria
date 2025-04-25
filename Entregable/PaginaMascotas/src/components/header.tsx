import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white w-full sticky top-0  shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">PetCare 🐾</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-blue-400 transition">Inicio</Link>
          <Link to="/servicios" className="hover:text-blue-400 transition">Servicios</Link>
          <Link to="/lugares" className="hover:text-blue-400 transition">Lugares</Link>
          <Link to="/contacto" className="hover:text-blue-400 transition">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

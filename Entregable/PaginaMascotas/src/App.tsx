import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

import Home from './pages/home';
import Services from './pages/Services';
import Places from './pages/Places';
import Contact from './pages/Contact';
import './index.css'; // o './App.css'



function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/lugares" element={<Places />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

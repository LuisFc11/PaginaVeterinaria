import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Calendar, Star, Stethoscope, MapPin, Award, Clock, Heart, Shield, Syringe, Pill, Microscope, PawPrint, Thermometer, Clipboard, AlertCircle } from 'lucide-react';

// Types
interface Veterinarian {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  experience: number;
  location: string;
  availability: string[];
  rating: number;
  contact: {
    phone: string;
    email: string;
  };
  description: string;
}

type LocationType = "All" | "Norte" | "Sur" | "Este" | "Oeste" | "Central";
type SortType = "rating" | "experience" | "name";

// Data
const veterinarians: Veterinarian[] = [
  {
    id: "vet-001",
    name: "Dr. Sarah Johnson",
    photo: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Medicina de Animales Pequeños",
    experience: 8,
    location: "Norte",
    availability: ["Lunes", "Martes", "Viernes", "Sabado"],
    rating: 4.8,
    contact: {
      phone: "(555) 123-4567",
      email: "sarah.johnson@vetclinic.com"
    },
     description: "La Dra. Johnson se especializa en atención preventiva y tratamiento para perros, gatos y mascotas exóticas pequeñas, con un enfoque en medicina geriátrica."
   },
  {
    id: "vet-002",
    name: "Dr. Michael Rodriguez",
    photo: "https://media.istockphoto.com/id/1995860815/es/foto/mujer-veterinaria-sosteniendo-al-perro-jack-russell.jpg?s=612x612&w=0&k=20&c=ZLFwLWVnPXnCx876vI312OhVUUOEU5Z_9ZHQfvBS4jk=",
    specialty: "Cirugía",
    experience: 12,
    location: "Central",
    availability: ["Martes", "Jueves", "Viernes", "Domingo"],
    rating: 4.9,
    contact: {
      phone: "(555) 234-5678",
      email: "michael.rodriguez@vetclinic.com"
    },
    description: "Como nuestro cirujano principal, el Dr. Rodriguez realiza procedimientos quirúrgicos tanto rutinarios como complejos, con especialización en cirugía ortopédica y de tejidos blandos."
  },
  {
    id: "vet-003",
    name: "Dr. Emily Chen",
    photo: "https://images.pexels.com/photos/6234608/pexels-photo-6234608.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Dermatología",
    experience: 6,
    location: "Sur",
    availability: ["Lunes", "Miercoles", "Sabado", "Domingo"],
    rating: 4.7,
    contact: {
      phone: "(555) 345-6789",
      email: "emily.chen@vetclinic.com"
    },
     description: "La Dra. Chen se especializa en el diagnóstico y tratamiento de diversas afecciones cutáneas en animales de compañía y exóticos."
  },
  {
    id: "vet-004",
    name: "Dr. James Wilson",
    photo: "https://s3.nuvemvet.com/blog/wp-content/uploads/2022/05/18161530/atendimento-2.jpg",
    specialty: "Animales Exóticos",
    experience: 10,
    location: "Oeste",
    availability: ["Martes", "Miercoles", "Viernes", "Sabado", "Domingo"],
    rating: 4.6,
    contact: {
      phone: "(555) 456-7890",
      email: "james.wilson@vetclinic.com"
    },
   description: "Con una pasión por las especies exóticas, el Dr. Wilson brinda atención especializada a aves, reptiles, anfibios y pequeños mamíferos."
  },
  {
    id: "vet-005",
    name: "Dr. Lisa Martinez",
    photo: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Cardiología",
    experience: 15,
    location: "Este",
    availability: ["Martes", "Miercoles", "Jueves", "Domingo"],
    rating: 4.9,
    contact: {
      phone: "(555) 567-8901",
      email: "lisa.martinez@vetclinic.com"
    },
   description: "La Dra. Martinez diagnostica y trata enfermedades cardíacas en animales de compañía, con un interés especial en defectos cardíacos congénitos."
  },
  {
    id: "vet-006",
    name: "Dr. Robert Kim",
    photo: "https://cdnx.jumpseller.com/movet/image/25779061/resize/1200/1200?1717558738",
    specialty: "Neurología",
    experience: 9,
    location: "Norte",
    availability: ["Martes", "Jueves", "Viernes", "Domingo"],
    rating: 4.7,
    contact: {
      phone: "(555) 678-9012",
      email: "robert.kim@vetclinic.com"
    },
    description: "El Dr. Kim se especializa en trastornos neurológicos y ofrece servicios de diagnóstico avanzado, incluyendo interpretación de resonancia magnética."
  },
  {
    id: "vet-007",
    name: "Dr. Sophia Patel",
    photo: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Odontología",
    experience: 7,
    location: "Central",
    availability: ["Miercoles", "Viernes", "Sabado", "Domingo"],
    rating: 4.8,
    contact: {
      phone: "(555) 789-0123",
      email: "sophia.patel@vetclinic.com"
    },
     description: "La Dra. Patel se enfoca en el cuidado dental preventivo y en procedimientos dentales complejos para todos los animales de compañía."
  },
  {
    id: "vet-008",
    name: "Dr. Thomas Wright",
    photo: "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Medicina de Urgencias",
    experience: 14,
    location: "Sur",
    availability: ["Lunes", "Miercoles", "Jueves", "Domingo"],
    rating: 4.9,
    contact: {
      phone: "(555) 890-1234",
      email: "thomas.wright@vetclinic.com"
    },
    description: "Como especialista en atención de urgencias, el Dr. Wright tiene amplia experiencia en el manejo de situaciones veterinarias críticas y urgentes."
  }
];

const services = [
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Protege a tus mascotas contra enfermedades comunes y graves.",
    features: [
      "Vacunas para perros y gatos",
      "Esquemas personalizados",
      "Seguimiento anual"
    ]
  },
  {
    icon: Microscope,
    title: "Exámenes de laboratorio",
    description: "Análisis precisos para un diagnóstico completo.",
    features: [
      "Análisis de sangre",
      "Exámenes de heces y orina",
      "Pruebas rápidas"
    ]
  },
  {
    icon: PawPrint,
    title: "Consultas generales",
    description: "Atención médica básica y orientación profesional.",
    features: [
      "Chequeos rutinarios",
      "Evaluación de síntomas",
      "Control de peso y salud"
    ]
  },
  {
    icon: Shield,
    title: "Desparasitación",
    description: "Elimina parásitos internos y externos de forma segura.",
    features: [
      "Desparasitación interna",
      "Control de pulgas y garrapatas",
      "Plan de prevención mensual"
    ]
  }
];


const specialtyServices = [
  {
    icon: PawPrint,
    title: "Cuidado de Mascotas Exóticas",
    description: "Atención especializada para aves, reptiles y pequeños mamíferos exóticos."
  },
  {
    icon: Thermometer,
    title: "Medicina Interna",
    description: "Tratamiento avanzado para condiciones médicas complejas."
  },
  {
    icon: Pill,
    title: "Servicios de Farmacia",
    description: "Farmacia completa para todas las necesidades de medicación de tu mascota."
  },
  {
    icon: Clipboard,
    title: "Consulta de Comportamiento",
    description: "Asesoramiento experto para manejar problemas de conducta en mascotas."
  }
];


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortType>('rating');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [filteredVets, setFilteredVets] = useState<Veterinarian[]>(veterinarians);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);

  const locations: LocationType[] = ["All", "Norte", "Sur", "Este", "Oeste", "Central"];
  const days = ["All", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  useEffect(() => {
    let filtered = [...veterinarians];
    
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(vet => vet.location === selectedLocation);
    }
    
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        vet => 
          vet.name.toLowerCase().includes(searchLower) || 
          vet.specialty.toLowerCase().includes(searchLower)
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter(vet => vet.rating >= minRating);
    }

    if (selectedDay !== 'All') {
      filtered = filtered.filter(vet => vet.availability.includes(selectedDay));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    setFilteredVets(filtered);
  }, [searchTerm, selectedLocation, minRating, sortBy, selectedDay]);

  const handleBookAppointment = (vet: Veterinarian) => {
    setSelectedVet(vet);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      <main>
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Encuentra a Tu Veterinario Perfecto
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conéctese con especialistas veterinarios experimentados en diferentes ubicaciones. 
                Reserve citas y asegure el mejor cuidado para sus queridas mascotas.
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Buscar por nombre o especialidad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Location Filter */}
                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value as LocationType)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Day Filter */}
                <div>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>{day === 'All' ? 'Any Day' : day}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experienced</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mt-4">
                <label className="text-sm text-gray-600">Minimum Rating:</label>
                <div className="flex items-center space-x-2 mt-2">
                  {[0, 4, 4.2, 4.4, 4.6, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        minRating === rating
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'All' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            {filteredVets.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all veterinarians.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVets.map((vet) => (
                  <div key={vet.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={vet.photo} 
                        alt={vet.name} 
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {vet.location}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{vet.name}</h3>
                        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                          <span className="text-sm font-medium text-yellow-700">{vet.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3 flex items-center">
                        <span className="inline-flex items-center bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                          <Award className="w-3 h-3 mr-1" />
                          {vet.specialty}
                        </span>
                        <span className="inline-block ml-2 text-gray-600 text-sm">
                          {vet.experience} {vet.experience === 1 ? 'años' : 'años'} exp.
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vet.description}</p>
                      
                      <div className="flex flex-col space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="text-sm">{vet.contact.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-sm">{vet.contact.email}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Available on:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((day) => (
                            <span 
                              key={day}
                              className={`text-xs px-2 py-1 rounded-full ${
                                vet.availability.includes(day) 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleBookAppointment(vet)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-300 font-medium flex items-center justify-center"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Reservar cita
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      {/* Sección de Servicios */}
<section className="py-16 bg-white" id="services">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Nuestros Servicios Veterinarios</h2>
      <p className="mt-4 text-xl text-gray-600">
        Ofrecemos una amplia gama de servicios veterinarios para mantener a tus mascotas sanas y felices.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => {
        const IconComponent = service.icon;
        return (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* Sección de Servicios Especializados */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Servicios Especializados</h2>
      <p className="mt-4 text-xl text-gray-600">
        Opciones avanzadas de cuidado para necesidades específicas de salud de tu mascota.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {specialtyServices.map((service, index) => {
        const IconComponent = service.icon;
        return (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>

   {/* Sección de Servicios de Emergencia */}
<section className="py-16 bg-blue-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 lg:p-12">
          <div className="flex items-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Atención de Emergencias 24/7</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Nuestro equipo veterinario de emergencias está disponible las 24 horas del día, los 7 días de la semana, para brindar atención inmediata a tus mascotas en situaciones críticas.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                  <Phone className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Línea de Emergencia</h3>
                <p className="text-gray-600">Llama al (555) 911-MASC para asistencia inmediata</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Varias Sedes</h3>
                <p className="text-gray-600">Atención de emergencias disponible en todas nuestras instalaciones</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Atención Experta</h3>
                <p className="text-gray-600">Veterinarios y personal con experiencia en emergencias</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-64 lg:h-auto">
          <img
            src="https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Atención Veterinaria de Emergencia"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      </main>

     {/* Modal de Reserva */}
{showBookingModal && selectedVet && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-md w-full p-6">
      <h3 className="text-xl font-semibold mb-4">Reservar cita con {selectedVet.name}</h3>
      <p className="text-gray-600 mb-4">
        Por favor, selecciona la fecha y hora que prefieras para agendar una cita.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Días disponibles
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedVet.availability.map((day) => (
              <span key={day} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowBookingModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              alert(`Reservando cita con ${selectedVet.name}`);
              setShowBookingModal(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Confirmar reserva
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
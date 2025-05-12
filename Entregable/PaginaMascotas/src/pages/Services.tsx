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

type LocationType = "All" | "North" | "South" | "East" | "West" | "Central";
type SortType = "rating" | "experience" | "name";

// Data
const veterinarians: Veterinarian[] = [
  {
    id: "vet-001",
    name: "Dr. Sarah Johnson",
    photo: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Small Animal Medicine",
    experience: 8,
    location: "North",
    availability: ["Mon", "Tue", "Wed", "Fri"],
    rating: 4.8,
    contact: {
      phone: "(555) 123-4567",
      email: "sarah.johnson@vetclinic.com"
    },
    description: "Dr. Johnson specializes in preventive care and treatment for dogs, cats, and small exotic pets with a focus on geriatric medicine."
  },
  {
    id: "vet-002",
    name: "Dr. Michael Rodriguez",
    photo: "https://images.pexels.com/photos/5330961/pexels-photo-5330961.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Surgery",
    experience: 12,
    location: "Central",
    availability: ["Mon", "Wed", "Thu", "Fri"],
    rating: 4.9,
    contact: {
      phone: "(555) 234-5678",
      email: "michael.rodriguez@vetclinic.com"
    },
    description: "As our lead surgeon, Dr. Rodriguez performs both routine and complex surgical procedures, specializing in orthopedic and soft tissue surgeries."
  },
  {
    id: "vet-003",
    name: "Dr. Emily Chen",
    photo: "https://images.pexels.com/photos/6234608/pexels-photo-6234608.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Dermatology",
    experience: 6,
    location: "South",
    availability: ["Tue", "Wed", "Thu", "Sat"],
    rating: 4.7,
    contact: {
      phone: "(555) 345-6789",
      email: "emily.chen@vetclinic.com"
    },
    description: "Dr. Chen specializes in diagnosing and treating various skin conditions in both companion and exotic animals."
  },
  {
    id: "vet-004",
    name: "Dr. James Wilson",
    photo: "https://images.pexels.com/photos/8942920/pexels-photo-8942920.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Exotic Animals",
    experience: 10,
    location: "East",
    availability: ["Mon", "Tue", "Thu", "Fri", "Sat"],
    rating: 4.6,
    contact: {
      phone: "(555) 456-7890",
      email: "james.wilson@vetclinic.com"
    },
    description: "With a passion for exotic species, Dr. Wilson provides specialized care for birds, reptiles, amphibians, and small mammals."
  },
  {
    id: "vet-005",
    name: "Dr. Lisa Martinez",
    photo: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Cardiology",
    experience: 15,
    location: "West",
    availability: ["Wed", "Thu", "Fri", "Sat"],
    rating: 4.9,
    contact: {
      phone: "(555) 567-8901",
      email: "lisa.martinez@vetclinic.com"
    },
    description: "Dr. Martinez diagnoses and treats heart diseases in companion animals, with a special interest in congenital heart defects."
  },
  {
    id: "vet-006",
    name: "Dr. Robert Kim",
    photo: "https://images.pexels.com/photos/6234723/pexels-photo-6234723.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Neurology",
    experience: 9,
    location: "North",
    availability: ["Mon", "Tue", "Wed", "Fri"],
    rating: 4.7,
    contact: {
      phone: "(555) 678-9012",
      email: "robert.kim@vetclinic.com"
    },
    description: "Dr. Kim specializes in neurological disorders and offers advanced diagnostic services including MRI interpretation."
  },
  {
    id: "vet-007",
    name: "Dr. Sophia Patel",
    photo: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Dentistry",
    experience: 7,
    location: "Central",
    availability: ["Tue", "Wed", "Thu", "Sat"],
    rating: 4.8,
    contact: {
      phone: "(555) 789-0123",
      email: "sophia.patel@vetclinic.com"
    },
    description: "Dr. Patel focuses on preventive dental care and complex dental procedures for all companion animals."
  },
  {
    id: "vet-008",
    name: "Dr. Thomas Wright",
    photo: "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=800",
    specialty: "Emergency Medicine",
    experience: 14,
    location: "South",
    availability: ["Mon", "Wed", "Fri", "Sat", "Sun"],
    rating: 4.9,
    contact: {
      phone: "(555) 890-1234",
      email: "thomas.wright@vetclinic.com"
    },
    description: "As our emergency care specialist, Dr. Wright has extensive experience handling critical and urgent veterinary situations."
  }
];

const services = [
  {
    icon: Heart,
    title: "Preventive Care",
    description: "Regular check-ups, vaccinations, and wellness programs to keep your pet healthy.",
    features: ["Annual examinations", "Vaccination programs", "Parasite prevention", "Health screenings"]
  },
  {
    icon: Syringe,
    title: "Surgery",
    description: "State-of-the-art surgical procedures for both routine and complex cases.",
    features: ["Spay & neuter", "Orthopedic surgery", "Soft tissue surgery", "Dental procedures"]
  },
  {
    icon: Microscope,
    title: "Diagnostics",
    description: "Advanced diagnostic tools for accurate and timely disease detection.",
    features: ["Digital X-rays", "Ultrasound", "Laboratory testing", "Endoscopy"]
  },
  {
    icon: Shield,
    title: "Emergency Care",
    description: "24/7 emergency services for urgent medical situations.",
    features: ["Critical care", "Trauma treatment", "Emergency surgery", "Intensive monitoring"]
  }
];

const specialtyServices = [
  {
    icon: PawPrint,
    title: "Exotic Pet Care",
    description: "Specialized care for birds, reptiles, and small exotic mammals."
  },
  {
    icon: Thermometer,
    title: "Internal Medicine",
    description: "Advanced treatment for complex medical conditions."
  },
  {
    icon: Pill,
    title: "Pharmacy Services",
    description: "Full-service pharmacy for all your pet's medication needs."
  },
  {
    icon: Clipboard,
    title: "Behavioral Consultation",
    description: "Expert advice for managing pet behavior issues."
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

  const locations: LocationType[] = ["All", "North", "South", "East", "West", "Central"];
  const days = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
                          {vet.experience} {vet.experience === 1 ? 'year' : 'years'} exp.
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
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
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
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Comprehensive Services</h2>
              <p className="mt-4 text-xl text-gray-600">
                We offer a wide range of veterinary services to keep your pets healthy and happy
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

        {/* Specialty Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Specialty Services</h2>
              <p className="mt-4 text-xl text-gray-600">
                Advanced care options for specific pet health needs
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

        {/* Emergency Services Section */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">24/7 Emergency Care</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Our emergency veterinary team is available 24 hours a day, 7 days a week to provide immediate care for your pets in critical situations.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                          <Phone className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Emergency Hotline</h3>
                        <p className="text-gray-600">Call (555) 911-PETS for immediate assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                          <MapPin className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Multiple Locations</h3>
                        <p className="text-gray-600">Emergency care available at all our facilities</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                          <Shield className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Expert Care</h3>
                        <p className="text-gray-600">Experienced emergency veterinarians and staff</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto">
                  <img
                    src="https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Emergency Veterinary Care"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {showBookingModal && selectedVet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Book Appointment with {selectedVet.name}</h3>
            <p className="text-gray-600 mb-4">
              Please select your preferred date and time to schedule an appointment.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Days
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
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Booking appointment with ${selectedVet.name}`);
                    setShowBookingModal(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Confirm Booking
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

import {
  Heart,
  Syringe,
  Stethoscope,
  Scissors,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react"

export default function VeterinaryClinic() {

  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-r from-teal-500 to-teal-700 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Cuidado profesional para tu mascota</h1>
              <p className="text-lg mb-8">
                En PetCare Veterinaria ofrecemos servicios médicos de alta calidad para asegurar la salud y bienestar de
                tu compañero fiel.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#servicios">
  <button className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
    Nuestros Servicios
  </button>
</a>

<a href="/contact">
  <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-teal-700 transition-colors">
    Contactos
  </button>
</a>

              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2023/10/19/veterinario-gsc1.jpeg"
                alt="Veterinario con mascota"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        ></div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios veterinarios para mantener a tu mascota saludable y feliz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Stethoscope className="h-10 w-10 text-teal-600" />,
                title: "Consulta General",
                description: "Exámenes completos para evaluar la salud general de tu mascota.",
              },
              {
                icon: <Syringe className="h-10 w-10 text-teal-600" />,
                title: "Vacunación",
                description: "Programas de vacunación personalizados para prevenir enfermedades.",
              },
              {
                icon: <Scissors className="h-10 w-10 text-teal-600" />,
                title: "Peluquería",
                description: "Servicios de estética y cuidado del pelaje para mantener a tu mascota limpia.",
              },
              {
                icon: <Heart className="h-10 w-10 text-teal-600" />,
                title: "Cirugía",
                description: "Procedimientos quirúrgicos realizados por especialistas experimentados.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-teal-100"
              >
                <div className="bg-teal-50 p-3 rounded-full w-fit mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a
                  href="#"
                  className="text-teal-600 font-medium flex items-center hover:text-teal-700 transition-colors"
                >
                  Saber más <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
              Ver todos los servicios
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <img
                src="https://cdn.nubika.es/wp-content/uploads/2021/05/hospital-de-perros.jpg"
                alt="Equipo veterinario"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Sobre Nosotros</h2>
              <p className="text-lg text-gray-600 mb-6">
                Con más de 15 años de experiencia, PetCare Veterinaria se ha convertido en un referente en cuidado
                animal en la región. Nuestro equipo está formado por profesionales apasionados y altamente cualificados.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Contamos con instalaciones modernas y equipamiento de última generación para ofrecer el mejor
                diagnóstico y tratamiento para tu mascota.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { number: "15+", text: "Años de experiencia" },
                  { number: "5,000+", text: "Mascotas atendidas" },
                  { number: "8", text: "Veterinarios especialistas" },
                  { number: "24/7", text: "Atención de emergencias" },
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-3xl font-bold text-teal-600">{stat.number}</p>
                    <p className="text-gray-600">{stat.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Appointment Section */}
            <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">¿Tu mascota necesita atención?</h2>
              <p className="text-teal-100">Agenda una cita hoy mismo y recibe atención prioritaria.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                <Calendar className="h-5 w-5 mr-2" />
                Agendar Cita
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-teal-700 transition-colors flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Llamar Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              La satisfacción de nuestros clientes y el bienestar de sus mascotas son nuestra mayor recompensa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                pet: "Dueña de Luna",
                image: "https://phantom-marca-us.unidadeditorial.es/81a76985acc8427ee1ba0f3a1e0654dc/resize/828/f/jpg/assets/multimedia/imagenes/2022/12/20/16715060077928.jpg",
                text: "El equipo de PetCare ha cuidado de mi perrita Luna desde que era un cachorro. Su profesionalismo y cariño hacia los animales es excepcional.",
              },
              {
                name: "Carlos Rodríguez",
                pet: "Dueño de Max",
                image: "https://estaticos.elcolombiano.com/binrepository/848x565/22c0/780d565/none/11101/JPRP/foto-neymar-jr-el-gran-ausente-en_47447903_20250320153223.jpg",
                text: "Cuando Max necesitó una cirugía de emergencia, el equipo de PetCare estuvo disponible de inmediato. No puedo estar más agradecido por su rápida respuesta.",
              },
              {
                name: "Ana Martínez",
                pet: "Dueña de Milo",
                image: "https://media.a24.com/p/c55dbdd613d2f2e8bda56310d6458e2f/adjuntos/296/imagenes/008/358/0008358861/1200x675/smart/real-madrids-portuguese-forward-cristiano-ronaldo-celebrates-after-scoring-second-goal-during-the-uefa-champions-league-quarter-final-first-leg-football-match-between-juventus-and-real-madrid-at-the-allianz-stadium-in-turin-on-april-3-2018-afp-phot.jpg",
                text: "Los servicios de peluquería son excelentes. Mi gato Milo siempre regresa feliz y hermoso. Recomiendo PetCare a todos mis amigos con mascotas.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.pet}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  )
}

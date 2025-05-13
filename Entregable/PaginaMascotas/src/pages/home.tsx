
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
                En CanFiru Veterinaria encontraras servicios médicos de alta calidad para asegurar la salud y bienestar de
                tu compañero fiel.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/servicios">
  <button className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
    Nuestros Servicios
  </button>
</a>

<a href="/contacto">
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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Servicios</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Reunimos en un solo lugar los mejores servicios veterinarios de diferentes clínicas y profesionales. ¡Todo lo que tu mascota necesita, en un solo sitio!
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: <Stethoscope className="h-10 w-10 text-teal-600" />,
          title: "Consultas Médicas",
          description: "Accede a consultas veterinarias generales y especializadas con médicos de diferentes clínicas.",
        },
        {
          icon: <Syringe className="h-10 w-10 text-teal-600" />,
          title: "Vacunación y Desparasitación",
          description: "Encuentra campañas de vacunación y tratamientos preventivos en distintas veterinarias cercanas.",
        },
        {
          icon: <Scissors className="h-10 w-10 text-teal-600" />,
          title: "Peluquería y Baño",
          description: "Servicios de grooming profesional ofrecidos por centros afiliados. ¡Tu mascota siempre limpia y feliz!",
        },
        {
          icon: <Heart className="h-10 w-10 text-teal-600" />,
          title: "Emergencias y Cirugías",
          description: "Atención inmediata y procedimientos quirúrgicos con veterinarios calificados de diversas clínicas.",
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
            href="/servicios"
            className="text-teal-600 font-medium flex items-center hover:text-teal-700 transition-colors"
          >
            Saber más <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center">
      <a href="/lugares" className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
        Ver todas las veterinarias
      </a>
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
          Somos una plataforma que conecta a las mejores veterinarias en un solo lugar. Nuestro objetivo es facilitarte el acceso a servicios veterinarios de calidad, sin importar dónde te encuentres.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Reunimos clínicas con experiencia, profesionales apasionados y centros especializados para cuidar a tu mascota como se merece. Todo desde un solo sitio, fácil, rápido y confiable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { number: "300+", text: "Veterinarias registradas" },
            { number: "1,000+", text: "Mascotas atendidas" },
            { number: "590+", text: "Veterinarios disponibles" },
            { number: "24/7", text: "Emergencias en línea" },
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
        <p className="text-teal-100">Encuentra veterinarias disponibles y agenda tu cita en pocos clics.</p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <a href="/lugares" className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
          <Calendar className="h-5 w-5 mr-2" />
          Buscar Veterinaria
        </a>
        <a href="/lugares" className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-teal-700 transition-colors flex items-center justify-center">
  <MapPin className="h-5 w-5 mr-2" />
  Ver en el Mapa
</a>

      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
<section id="testimonios" className="py-20 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Lo Que Dicen Nuestros Usuarios</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Usuarios de toda la región confían en nuestra plataforma para encontrar atención veterinaria rápida y segura.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Lucía Herrera",
          pet: "Dueña de Coco",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          text: "Gracias a esta plataforma encontré una veterinaria cerca de casa que atendió a mi perro Coco en menos de una hora. Súper útil y fácil de usar.",
        },
        {
          name: "José Méndez",
          pet: "Dueño de Tom",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          text: "Mi gato necesitaba una consulta urgente y la app me conectó con una clínica que tenía disponibilidad. ¡Servicio rápido y confiable!",
        },
        {
          name: "Valeria Ríos",
          pet: "Dueña de Nina",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          text: "Pude comparar veterinarias, ver precios y agendar desde mi celular. Es como tener todas las veterinarias en un solo lugar. ¡Recomendado!",
        },
      ].map((testimonial, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <img
              src={testimonial.image}
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

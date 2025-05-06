"use client"

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
                <button className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Nuestros Servicios
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-teal-700 transition-colors">
                  Contactar
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
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
                src="/placeholder.svg?height=500&width=600"
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
                image: "/placeholder.svg?height=100&width=100",
                text: "El equipo de PetCare ha cuidado de mi perrita Luna desde que era un cachorro. Su profesionalismo y cariño hacia los animales es excepcional.",
              },
              {
                name: "Carlos Rodríguez",
                pet: "Dueño de Max",
                image: "/placeholder.svg?height=100&width=100",
                text: "Cuando Max necesitó una cirugía de emergencia, el equipo de PetCare estuvo disponible de inmediato. No puedo estar más agradecido por su rápida respuesta.",
              },
              {
                name: "Ana Martínez",
                pet: "Dueña de Milo",
                image: "/placeholder.svg?height=100&width=100",
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

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contáctanos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para responder tus preguntas y atender a tu mascota.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Información de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-teal-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">Dirección</p>
                      <p className="text-gray-600">Av. Principal 123, Ciudad</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-teal-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">Teléfono</p>
                      <p className="text-gray-600">+123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-teal-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p className="text-gray-600">info@petcare.com</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 mb-2">Horario de Atención</p>
                    <div className="text-gray-600">
                      <p>Lunes - Viernes: 9:00 - 20:00</p>
                      <p>Sábados: 10:00 - 18:00</p>
                      <p>Domingos: 10:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Tu email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Asunto del mensaje"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Tu mensaje"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors w-full md:w-auto"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-teal-400" />
                <span className="ml-2 text-xl font-bold">PetCare Veterinaria</span>
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
    </div>
  )
}

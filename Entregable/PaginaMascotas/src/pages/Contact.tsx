"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  phone: string
  petName: string
  petType: string
  message: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    petName: "",
    petType: "",
    message: "",  
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        petName: "",
        petType: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8" id="contacto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para cuidar de tu mascota. No dudes en contactarnos para cualquier consulta o para agendar una
            cita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h3>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                ¡Gracias por contactarnos! Te responderemos a la brevedad.
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de tu mascota
                  </label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de mascota
                  </label>
                  <select
                    id="petType"
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Seleccionar</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="ave">Ave</option>
                    <option value="roedor">Roedor</option>
                    <option value="reptil">Reptil</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe el motivo de tu consulta..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div>
            <div className="bg-emerald-50 rounded-lg shadow-lg p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de contacto</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-700">
                    <p className="font-medium">Dirección</p>
                    <p>Av. Principal 123, Colonia Centro</p>
                    <p>Ciudad, CP 12345</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-700">
                    <p className="font-medium">Teléfonos</p>
                    <p>+123 456 7890 (Consultas)</p>
                    <p>+123 456 7891 (Emergencias 24h)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-700">
                    <p className="font-medium">Correo electrónico</p>
                    <p>contacto@miveterinaria.com</p>
                    <p>citas@miveterinaria.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-3 text-base text-gray-700">
                    <p className="font-medium">Horario de atención</p>
                    <p>Lunes a Viernes: 9:00 - 19:00</p>
                    <p>Sábados: 9:00 - 14:00</p>
                    <p>Domingos: Cerrado (Solo emergencias)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    <Facebook className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mapa de ubicación */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0568405744516!2d-76.24025552513308!3d-9.929224406096305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c3e79ca98929%3A0xcd6cdc772c19a6f4!2sSenati!5e0!3m2!1ses!2spe!4v1746535565914!5m2!1ses!2spe"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0"
      ></iframe>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

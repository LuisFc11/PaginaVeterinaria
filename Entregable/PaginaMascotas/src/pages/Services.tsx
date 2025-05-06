import { useState, useEffect, JSX } from "react"
import {
  Search,
  MapPin,
  Phone,
  Clock,
  Star,
  Filter,
  ChevronDown,
  ChevronRight,
  X,
  Heart,
  Stethoscope,
  Syringe,
  Scissors,
  Pill,
  Microscope,
  Bone,
  Bath,
  SmileIcon as Tooth,
} from "lucide-react"

// Tipos de datos
type Servicio = {
  id: number
  nombre: string
  icono: JSX.Element
}

type Veterinaria = {
  id: number
  nombre: string
  direccion: string
  telefono: string
  horario: string
  calificacion: number
  distancia: string
  imagen: string
  servicios: number[]
  coordenadas: { lat: number; lng: number }
}

export default function BuscadorVeterinarias() {
  // Estados
  const [ubicacionUsuario, setUbicacionUsuario] = useState<string>("")
  const [veterinariasEncontradas, setVeterinariasEncontradas] = useState<Veterinaria[]>([])
  const [veterinariaSeleccionada, setVeterinariaSeleccionada] = useState<Veterinaria | null>(null)
  const [filtroServicio, setFiltroServicio] = useState<number | null>(null)
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false)
  const [cargando, setCargando] = useState<boolean>(false)
  const [ordenarPor, setOrdenarPor] = useState<string>("distancia")

  // Lista de servicios disponibles
  const servicios: Servicio[] = [
    { id: 1, nombre: "Consulta General", icono: <Stethoscope className="h-5 w-5" /> },
    { id: 2, nombre: "Vacunación", icono: <Syringe className="h-5 w-5" /> },
    { id: 3, nombre: "Peluquería", icono: <Scissors className="h-5 w-5" /> },
    { id: 4, nombre: "Cirugía", icono: <Heart className="h-5 w-5" /> },
    { id: 5, nombre: "Farmacia", icono: <Pill className="h-5 w-5" /> },
    { id: 6, nombre: "Laboratorio", icono: <Microscope className="h-5 w-5" /> },
    { id: 7, nombre: "Nutrición", icono: <Bone className="h-5 w-5" /> },
    { id: 8, nombre: "Baños Medicados", icono: <Bath className="h-5 w-5" /> },
    { id: 9, nombre: "Odontología", icono: <Tooth className="h-5 w-5" /> },
  ]

  // Datos de ejemplo de veterinarias (en una aplicación real, estos datos vendrían de una API)
  const veterinariasEjemplo: Veterinaria[] = [
    {
      id: 1,
      nombre: "Clínica Veterinaria PetCare",
      direccion: "Av. Principal 123, Centro",
      telefono: "(123) 456-7890",
      horario: "Lun-Vie: 9:00-20:00, Sáb-Dom: 10:00-16:00",
      calificacion: 4.8,
      distancia: "0.5 km",
      imagen: "https://st2.depositphotos.com/5056293/9389/v/450/depositphotos_93899252-stock-illustration-vector-sign-veterinary.jpg",
      servicios: [1, 2, 3, 4, 5, 6, 7],
      coordenadas: { lat: 19.4326, lng: -99.1332 },
    },
    {
      id: 2,
      nombre: "Hospital Veterinario San Francisco",
      direccion: "Calle Norte 456, Col. Industrial",
      telefono: "(123) 456-7891",
      horario: "24 horas, todos los días",
      calificacion: 4.9,
      distancia: "1.2 km",
      imagen: "https://static.vecteezy.com/system/resources/previews/008/249/343/non_2x/veterinary-logo-cat-and-dog-logo-design-pet-care-vet-clinic-logo-pet-clinic-vector.jpg",
      servicios: [1, 2, 4, 5, 6, 8, 9],
      coordenadas: { lat: 19.4426, lng: -99.1432 },
    },
    {
      id: 3,
      nombre: "Veterinaria El Buen Amigo",
      direccion: "Av. Sur 789, Col. Jardines",
      telefono: "(123) 456-7892",
      horario: "Lun-Sáb: 10:00-19:00, Dom: Cerrado",
      calificacion: 4.5,
      distancia: "1.8 km",
      imagen: "https://st3.depositphotos.com/1364916/32746/v/450/depositphotos_327463754-stock-illustration-logo-dog-and-cat-silhouette.jpg",
      servicios: [1, 2, 3, 7],
      coordenadas: { lat: 19.4226, lng: -99.1232 },
    },
    {
      id: 4,
      nombre: "Centro Veterinario Especializado",
      direccion: "Plaza Comercial Este, Local 45",
      telefono: "(123) 456-7893",
      horario: "Lun-Dom: 9:00-21:00",
      calificacion: 4.7,
      distancia: "2.3 km",
      imagen: "https://img.freepik.com/vector-premium/linda-tienda-mascotas-logo-vector-icono-ilustracion_441059-308.jpg?semt=ais_hybrid&w=740",
      servicios: [1, 2, 4, 5, 6, 9],
      coordenadas: { lat: 19.4326, lng: -99.1132 },
    },
    {
      id: 5,
      nombre: "Veterinaria Huellitas",
      direccion: "Calle Poniente 234, Col. Moderna",
      telefono: "(123) 456-7894",
      horario: "Lun-Vie: 8:00-18:00, Sáb: 9:00-14:00",
      calificacion: 4.3,
      distancia: "3.1 km",
      imagen: "https://st2.depositphotos.com/1007168/5524/i/450/depositphotos_55249403-stock-photo-veterinary-blue-circle-label-with.jpg",
      servicios: [1, 2, 3, 5],
      coordenadas: { lat: 19.4126, lng: -99.1532 },
    },
    {
      id: 6,
      nombre: "Clínica para Mascotas Dr. Pérez",
      direccion: "Av. Central 567, Col. Reforma",
      telefono: "(123) 456-7895",
      horario: "Lun-Sáb: 9:00-19:00, Dom: 10:00-15:00",
      calificacion: 4.6,
      distancia: "3.5 km",
      imagen: "https://previews.123rf.com/images/uvaconcept/uvaconcept1512/uvaconcept151200261/49309743-plantilla-de-logotipo-para-la-cl%C3%ADnica-veterinaria-con-el-gato-y-el-perro.jpg",
      servicios: [1, 2, 3, 4, 5, 8],
      coordenadas: { lat: 19.4526, lng: -99.1632 },
    },
  ]

  // Simular búsqueda de veterinarias
  const buscarVeterinarias = () => {
    if (!ubicacionUsuario.trim()) return

    setCargando(true)

    // Simulamos una llamada a API con un timeout
    setTimeout(() => {
      let resultados = [...veterinariasEjemplo]

      // Filtrar por servicio si hay uno seleccionado
      if (filtroServicio !== null) {
        resultados = resultados.filter((v) => v.servicios.includes(filtroServicio))
      }

      // Ordenar resultados
      if (ordenarPor === "distancia") {
        resultados.sort((a, b) => Number.parseFloat(a.distancia) - Number.parseFloat(b.distancia))
      } else if (ordenarPor === "calificacion") {
        resultados.sort((a, b) => b.calificacion - a.calificacion)
      }

      setVeterinariasEncontradas(resultados)
      setCargando(false)
    }, 1000)
  }

  // Efecto para buscar automáticamente cuando cambia el filtro o el orden
  useEffect(() => {
    if (ubicacionUsuario) {
      buscarVeterinarias()
    }
  }, [filtroServicio, ordenarPor])

  // Obtener el nombre del servicio por ID
  const getNombreServicio = (id: number) => {
    return servicios.find((s) => s.id === id)?.nombre || ""
  }

  // Obtener el icono del servicio por ID
  const getIconoServicio = (id: number) => {
    return servicios.find((s) => s.id === id)?.icono || null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Encuentra Veterinarias Cerca de Ti</h1>
          <p className="text-xl mb-8">
            Localiza las mejores clínicas veterinarias en tu zona y descubre los servicios que ofrecen
          </p>

          {/* Buscador de ubicación */}
          <div className="bg-white rounded-lg shadow-lg p-1 flex items-center">
            <div className="flex-1 flex items-center">
              <MapPin className="h-5 w-5 text-teal-600 ml-3 mr-2" />
              <input
                type="text"
                placeholder="Ingresa tu ubicación o código postal"
                className="w-full py-3 px-2 text-gray-700 focus:outline-none"
                value={ubicacionUsuario}
                onChange={(e) => setUbicacionUsuario(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscarVeterinarias()}
              />
            </div>
            <button
              onClick={buscarVeterinarias}
              className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y ordenamiento */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center text-gray-700 font-medium"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filtrar por servicios
                <ChevronDown className={`h-5 w-5 ml-1 transition-transform ${mostrarFiltros ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Ordenar por:</span>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="distancia">Distancia</option>
                <option value="calificacion">Calificación</option>
              </select>
            </div>
          </div>

          {/* Filtros de servicios */}
          {mostrarFiltros && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="font-medium text-gray-700 mb-3">Servicios disponibles:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroServicio(null)}
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                    filtroServicio === null ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Todos los servicios
                </button>

                {servicios.map((servicio) => (
                  <button
                    key={servicio.id}
                    onClick={() => setFiltroServicio(servicio.id)}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                      filtroServicio === servicio.id
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="mr-1.5">{servicio.icono}</span>
                    {servicio.nombre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estado de carga */}
        {cargando && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Buscando veterinarias cercanas...</p>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {!cargando && veterinariasEncontradas.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de veterinarias */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Veterinarias cerca de {ubicacionUsuario || "tu ubicación"}
              </h2>

              <div className="space-y-4">
                {veterinariasEncontradas.map((veterinaria) => (
                  <div
                    key={veterinaria.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden border transition-all ${
                      veterinariaSeleccionada?.id === veterinaria.id
                        ? "border-teal-500 ring-1 ring-teal-500"
                        : "border-gray-100 hover:border-teal-200"
                    }`}
                  >
                    <div className="md:flex">
                      <div className="md:flex-shrink-0">
                        <img
                          src={veterinaria.imagen || "/placeholder.svg"}
                          alt={veterinaria.nombre}
                          className="h-48 w-full object-cover md:h-full md:w-48"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{veterinaria.nombre}</h3>
                          <div className="flex items-center bg-teal-50 px-2 py-1 rounded-md">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{veterinaria.calificacion}</span>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                            <span>
                              {veterinaria.direccion} • {veterinaria.distancia}
                            </span>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                            <span>{veterinaria.telefono}</span>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                            <span>{veterinaria.horario}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Servicios:</h4>
                          <div className="flex flex-wrap gap-2">
                            {veterinaria.servicios.slice(0, 4).map((servicioId) => (
                              <span
                                key={servicioId}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                              >
                                {getNombreServicio(servicioId)}
                              </span>
                            ))}
                            {veterinaria.servicios.length > 4 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                +{veterinaria.servicios.length - 4} más
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setVeterinariaSeleccionada(veterinaria)}
                            className="text-teal-600 hover:text-teal-800 font-medium flex items-center text-sm"
                          >
                            Ver detalles
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detalles de la veterinaria seleccionada o mapa */}
            <div className="lg:col-span-1">
              {veterinariaSeleccionada ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                  <div className="relative">
                    <img
                      src={veterinariaSeleccionada.imagen || "/placeholder.svg"}
                      alt={veterinariaSeleccionada.nombre}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => setVeterinariaSeleccionada(null)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{veterinariaSeleccionada.nombre}</h3>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center bg-teal-50 px-2 py-1 rounded-md mr-3">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{veterinariaSeleccionada.calificacion}</span>
                      </div>
                      <span className="text-sm text-gray-600">{veterinariaSeleccionada.distancia} de distancia</span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2 mb-4">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>{veterinariaSeleccionada.direccion}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>{veterinariaSeleccionada.telefono}</span>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>{veterinariaSeleccionada.horario}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <h4 className="font-medium text-gray-800 mb-3">Todos los servicios:</h4>
                      <ul className="space-y-2">
                        {veterinariaSeleccionada.servicios.map((servicioId) => (
                          <li key={servicioId} className="flex items-center">
                            <div className="bg-teal-50 p-1.5 rounded-full mr-2">{getIconoServicio(servicioId)}</div>
                            <span>{getNombreServicio(servicioId)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar ahora
                      </button>
                      <button className="w-full border border-teal-600 text-teal-600 px-4 py-2 rounded-md font-medium hover:bg-teal-50 transition-colors flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Agendar cita
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                  <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-teal-600 opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-600 text-center px-4">
                        Selecciona una veterinaria para ver su ubicación en el mapa
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2">Mapa de veterinarias</h3>
                    <p className="text-sm text-gray-600">
                      Aquí podrás ver la ubicación exacta de cada veterinaria y calcular la ruta más rápida.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sin resultados */}
        {!cargando && ubicacionUsuario && veterinariasEncontradas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron veterinarias</h3>
            <p className="text-gray-600 mb-4">
              No hay veterinarias que coincidan con tu búsqueda. Intenta con otra ubicación o quita los filtros.
            </p>
            <button
              onClick={() => {
                setFiltroServicio(null)
                setOrdenarPor("distancia")
                buscarVeterinarias()
              }}
              className="text-teal-600 font-medium hover:text-teal-800"
            >
              Quitar todos los filtros
            </button>
          </div>
        )}

        {/* Mensaje inicial */}
        {!cargando && !ubicacionUsuario && veterinariasEncontradas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="inline-block p-3 rounded-full bg-teal-50 mb-4">
              <MapPin className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ingresa tu ubicación</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Introduce tu dirección o código postal en el buscador para encontrar las veterinarias más cercanas a ti.
            </p>
          </div>
        )}
      </div>

      {/* Sección informativa */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-teal-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Por qué usar nuestro buscador?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Búsqueda Fácil</h3>
              <p className="text-gray-600">
                Encuentra rápidamente todas las veterinarias cercanas a tu ubicación con un solo clic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Filtros Avanzados</h3>
              <p className="text-gray-600">
                Filtra por servicios específicos para encontrar la veterinaria que mejor se adapte a tus necesidades.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Reserva Inmediata</h3>
              <p className="text-gray-600">
                Agenda citas directamente desde nuestra plataforma sin necesidad de llamadas telefónicas.
              </p>
            </div>
          </div>
        </div>
      </section>
   
    </div>
  )
}

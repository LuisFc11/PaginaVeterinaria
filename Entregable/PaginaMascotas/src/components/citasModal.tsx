import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CitasModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    nombreDuenio: "",
    telefono: "",
    correo: "",
    nombreMascota: "",
    especie: "",
    raza: "",
    motivo: "",
    fecha: "",
    hora: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3306/veterinaria2025", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Cita registrada correctamente");
        onClose();
      } else {
        alert("Error al registrar la cita");
      }
    } catch (error) {
      console.error("Error al enviar la cita:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-teal-700 text-center">Agendar Cita Veterinaria</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del dueño</label>
            <input
              type="text"
              name="nombreDuenio"
              placeholder="Juan Pérez"
              className="w-full border px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                placeholder="1234567890"
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                placeholder="correo@ejemplo.com"
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre de la mascota</label>
              <input
                type="text"
                name="nombreMascota"
                placeholder="Firulais"
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Especie</label>
              <select
                name="especie"
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Selecciona</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Raza</label>
            <input
              type="text"
              name="raza"
              placeholder="Labrador, Siames, etc."
              className="w-full border px-3 py-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Motivo de la cita</label>
            <textarea
              name="motivo"
              placeholder="Ej: Vacunación, revisión general, etc."
              rows={3}
              className="w-full border px-3 py-2 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                name="fecha"
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <input
                type="time"
                name="hora"
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Reservar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CitasModal;

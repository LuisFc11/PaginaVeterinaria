import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());
app.use(express.json());

// POST /citas — guarda los datos del formulario directamente
app.post("/citas", async (req, res) => {
  const {
    nombreDuenio,
    telefono,
    correo,
    nombreMascota,
    especie,
    raza,
    motivo,
    fecha,
    hora,
  } = req.body;

  try {
    const cita = await prisma.cita.create({
      data: {
        nombreDuenio,
        telefono,
        correo,
        nombreMascota,
        especie,
        raza,
        motivo,
        fecha: new Date(fecha),
        hora,
      },
    });

    res.status(201).json({ mensaje: "Cita registrada con éxito", cita });
  } catch (error) {
    console.error("Error al guardar cita:", error);
    res.status(500).json({ error: "No se pudo registrar la cita" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

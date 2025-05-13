import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno (.env debe tener DATABASE_URL)
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta POST para guardar cita
app.post("/api/cita", async (req, res) => {
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

// Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});


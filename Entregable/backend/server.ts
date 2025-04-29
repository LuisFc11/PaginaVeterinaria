import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.get('/lugares', async (req, res) => {
  try {
    const lugares = await prisma.lugar.findMany();
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lugares' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

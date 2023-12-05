import express from 'express';
import { router } from './routes/routes.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(router);

app.listen(3000, async () => {
  await prisma.$connect();
  console.log("Server listening on port 3000");
});

export default app;

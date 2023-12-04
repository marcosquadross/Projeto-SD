import express from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())

app.use(express.json())

app.use("/api", router)

app.listen(3000, async () => {
  await prisma.$connect()
  console.log("Server listening on port 3000")
})

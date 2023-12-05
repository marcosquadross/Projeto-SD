import cors from 'cors'
import express from 'express'
import { router as routes } from './src/routes/routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", routes)

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000')
})
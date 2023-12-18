import cors from 'cors'
import express from 'express'
import conn from './src/db/conn.js'
import { router as routes } from './src/routes/router.js'

const app = express()
app.use(cors())
app.use(express.json())

conn()

app.use("/api", routes)

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000')
})

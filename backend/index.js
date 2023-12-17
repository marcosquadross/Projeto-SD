import cors from 'cors'
import express from 'express'
import conn from './src/db/conn.js'
import { router as routes } from './src/routes/router.js'

// import { WebSocketServer } from 'ws';
// const wss = new WebSocketServer({ port: 8080 }); 

const app = express()
app.use(cors())
app.use(express.json())

conn()

const clients = new Map();

app.use("/api", routes)

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000')
})

// export { wss }

// wss.on('connection', (ws) => {
//   console.log('Cliente conectado');

//   // Evento para lidar com mensagens recebidas do cliente
//   ws.on('message', (message) => {
//       console.log(`Recebido do cliente: ${message}`);

//       // Enviar a mensagem de volta para o cliente
//       ws.send(`Recebido: ${message}`);
//   });

//   // Evento para lidar com a conexão fechada pelo cliente
//   ws.on('close', () => {
//       console.log('Cliente desconectado');
//   });

  
// });


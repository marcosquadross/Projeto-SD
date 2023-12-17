// websocket.js
export const initWebSocket = (callback) => {
  const ws = new WebSocket("ws://localhost:8080");

  ws.addEventListener("open", (event) => {
    console.log("Conexão aberta com o servidor");
  });

  ws.addEventListener("message", (event) => {
    console.log(`Recebido do servidor: ${event.data}`);
    callback(event.data);
  });

  ws.addEventListener("close", (event) => {
    console.log("Conexão fechada");
  });

  return ws;
};

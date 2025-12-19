const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 10000;

// HTTP server (THIS IS CRITICAL)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

// WebSocket attached to HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());

    // broadcast
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

server.listen(PORT, () => {
  console.log("WebSocket server running on port", PORT);
});

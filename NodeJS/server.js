"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const fs = require('fs');
// Initialize Express app and HTTP server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Initialize WebSocket server
const wss = new ws_1.default.Server({ server });

function appendMessageToFile(message) {
    const logFilePath = './data/demo.txt'; // Path to the log file
    // Append message to the file with a newline
    fs.appendFile(logFilePath, message + '\n', (err) => {
      if (err) {
        console.error('Failed to append message to file:', err);
      } else {
        console.log('Message appended to file:', message);
      }
    });
  }

wss.on('connection', (ws) => {
    // Connection is up, let's add a simple event
    ws.on('message', (message) => {
        console.log('Received message:', message.toString());
        if (message != "connected") {
            appendMessageToFile(message.toString());
          }
    });
});
// Start the server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

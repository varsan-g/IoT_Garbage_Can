"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
// Initialize Express app and HTTP server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Initialize WebSocket server
const wss = new ws_1.default.Server({ server });
wss.on('connection', (ws) => {
    // Connection is up, let's add a simple event
    ws.on('message', (message) => {
        console.log('Received message:', message.toString());
    });
    // Send a message to the client
    ws.send('Hello from the WebSocket server!');
});
// Start the server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

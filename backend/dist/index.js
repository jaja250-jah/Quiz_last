"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const socket_io_1 = require("socket.io");
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer(app_1.app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    socket.on('join-game', (pin) => {
        socket.join(`game:${pin}`);
    });
    socket.on('disconnect', () => {
        // handle disconnect
    });
});
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

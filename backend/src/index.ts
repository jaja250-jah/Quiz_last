import http from 'http';
import { app } from './app';
import { Server as IOServer } from 'socket.io';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: '*' } });

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

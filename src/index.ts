import { initServer } from '@controllers/initServer';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 8080;
const messageArr: string[] = [];

function listenCallback() {
  console.log(`[${new Date().toLocaleTimeString()}] ${PORT} 에서 서버를 열었어요`);
}

async function openServer() {
  const app = initServer();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:9000',
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    socket.on('message', ({ name, message }) => {
      console.log(message);
      io.emit('messageList', messageArr);
      messageArr.push(`[${name}]: ${message}`);
    });
  });
  server.listen(PORT, listenCallback);
}

openServer();

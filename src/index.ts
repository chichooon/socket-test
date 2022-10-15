import { initServer } from '@controllers/initServer';
import http from 'http';

const PORT = process.env.PORT || 8080;

function listenCallback() {
  console.log(`[${new Date().toLocaleTimeString()}] ${PORT} 에서 서버를 열었어요`);
}

async function openServer() {
  const app = initServer();
  const server = http.createServer(app);
  server.listen(PORT, listenCallback);
}

openServer();

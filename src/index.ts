import { initServer } from '@controllers/initServer';

const PORT = process.env.PORT || 8080;

function listenCallback() {
  console.log(`[${new Date().toLocaleTimeString()}] ${PORT} 에서 서버를 열었어요`);
}

async function openServer() {
  const app = initServer();
  app.listen(PORT, listenCallback);
}

openServer();

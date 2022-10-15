import express from 'express';
import { Pool } from 'mysql2/promise';
import path from 'path';

type ResponseCallback = (req: express.Request, res: express.Response, pool?: Pool) => void;

function setAPIs(app: express.Application, pool: Pool) {
  // API setting
}

function logMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(`[${new Date().toLocaleTimeString()}]\t${req.method} ${req.originalUrl} ${res.statusCode}`);
  next();
}

export function initServer() {
  const dirname = path.resolve();
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${dirname}/src/public`));
  app.use(logMiddleware);
  app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header(
      'Access-Control-Allow-Headers',
      'Charset, X-Requested-With, Accept, Content-Type, Authorization, Set-Cookie'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  return app;
}

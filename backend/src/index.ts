import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { redis } from 'libs';
import Router from 'routes';
import { ALLOWED_ORIGINS, PORT } from 'settings';
import path from 'path';

(async () => {
  await redis.connect();

  const app: Express = express();
  app.use(cors({ origin: ALLOWED_ORIGINS }));
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('combined'));
  app.use('/api', Router);
  app.use(express.static(path.join(__dirname, 'static')));
  app.set('trust proxy', true);

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
})();

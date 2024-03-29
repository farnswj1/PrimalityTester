import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ratelimiter } from 'middleware';
import Router from 'routes';
import { ALLOWED_ORIGINS, PORT } from 'settings';

const app: Express = express();
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));
app.use(ratelimiter({ endpoint: 'api', time: 60, limit: 5 }));
app.use('/api', Router);
app.set('trust proxy', true);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

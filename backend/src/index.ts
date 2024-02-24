import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { RateLimiter } from 'middleware';
import Router from 'routes';
import { PORT } from 'settings';

const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(RateLimiter({ endpoint: 'api', time: 60, limit: 5 }));
app.use('/api', Router);
app.set('trust proxy', true);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

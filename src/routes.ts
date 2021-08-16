import { Router } from 'express';
import { CacheController } from './controllers/cache.controller';

const routes = Router();

routes.post('/cache', CacheController.index);
routes.post('/clear-cache', CacheController.clear);

export const appRoutes = routes;

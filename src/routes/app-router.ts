import { Router } from 'express';
import { wrapRoutesWithAsyncHandler } from '@/utils';
import { AuthRouter, HealthRouter, ItemRouter } from './v1';

export const AppRouter = () => {
  const apiRouter = Router();

  apiRouter.use('/v1/health', HealthRouter);
  apiRouter.use('/v1/auth', AuthRouter);
  apiRouter.use('/v1/item', ItemRouter);

  wrapRoutesWithAsyncHandler(apiRouter);
  return apiRouter;
};

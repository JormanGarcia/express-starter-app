import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { ResponseEntity } from './response-entity';

type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | void;

const wrapHandler = (handler: RouteHandler) => routeHandlerWrapper(handler);

export const wrapRoutesWithAsyncHandler = (router: Router): void => {
  router.stack.forEach((layer) => {
    if (layer.route && layer.route.stack) {
      layer.route.stack.forEach((routeLayer) => {
        if (typeof routeLayer.handle === 'function') {
          routeLayer.handle = wrapHandler(routeLayer.handle as RouteHandler);
        }
      });
    } else if (layer.name === 'router') {
      wrapRoutesWithAsyncHandler(layer.handle as Router);
    }
  });
};

export const routeHandlerWrapper =
  (callback: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await callback(req, res, next);

      if (result === undefined && result === null) return res.send();
      if (result instanceof ResponseEntity) return res.status(result.status).json(result.data);
      if (typeof result === 'object') return res.json(result);

      res.send(result);
    } catch (error) {
      next(error);
    }
  };

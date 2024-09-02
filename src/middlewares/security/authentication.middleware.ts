import { RequestHandler, Router } from 'express';
import { AuthService } from '@/services/auth.service';
import { UnauthorizedException } from '@/utils/exceptions';

type AuthenticateRouterConfig = { publicRoutes?: string[] };
type AuthenticateRouterMiddleware = (config?: AuthenticateRouterConfig) => RequestHandler;

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token || !token.startsWith('Bearer ')) throw new UnauthorizedException();

  const [authenticated, tokenPayload] = AuthService.isTokenValid(token.slice(0, 6));
  if (!authenticated || !tokenPayload) throw new UnauthorizedException();

  req.user = { id: tokenPayload.id, authorities: tokenPayload.authorities };

  next();
};

export const authenticateRouter: AuthenticateRouterMiddleware =
  (config = {}) =>
  async (req, res, next) => {
    const { publicRoutes = [] } = config;

    if (publicRoutes.find((path) => path === req.path)) return next();

    authenticate(req, res, next);
  };

export const AuthenticatedRoute = (config?: AuthenticateRouterConfig) => Router().use(authenticateRouter(config));

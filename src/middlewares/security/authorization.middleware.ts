import { RequestHandler } from 'express';
import { UserAuthorities } from '@/models/user.model';
import { log } from '@/utils';
import { UnauthorizedException } from '@/utils/exceptions';

type AuthorizeHandler = (authority: UserAuthorities[]) => RequestHandler;

export const authorize: AuthorizeHandler = (authority) => (req, _, next) => {
  if (!req.user || !hasAuthorities(req.user.authorities, authority)) {
    if (!req.user)
      log.warn(
        'authorize',
        'req.user not found. please be sure that this function in being called after the authentication middleware',
      );

    throw new UnauthorizedException();
  }

  next();
};

const hasAuthorities = (authorities: UserAuthorities[], userAuthority: UserAuthorities[]): boolean => {
  return Boolean(authorities.some((item) => userAuthority.includes(item)));
};

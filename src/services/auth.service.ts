import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@/models/user.model';
import { SignupRequestDTO } from '@/dtos/auth.dto';
import { CLEAN_VARS } from '@/utils/constants';
import { UnauthorizedException } from '@/utils/exceptions';
import { log } from '@/utils/logger.utils';
import { UserService } from './users.service';

export abstract class AuthService {
  static async login(email: string, password: string): Promise<string> {
    const user = await UserService.getUserByEmail(email).catch(() => {
      log.warn('AuthService.login', `email: ${email} not found`);
      return null;
    });

    if (!user || (await this.#comparePassword(password, user.password)) === false) throw new UnauthorizedException();

    const token = this.signToken(user);
    return token;
  }

  static async signup(payload: SignupRequestDTO) {
    const user = await UserService.createUser({ email: payload.email, password: payload.password });
    return user;
  }

  static signToken = (user: User): string => {
    return jwt.sign(
      {
        firstName: user.firstname,
        id: user.id,
        authorities: user.authorities,
      },
      CLEAN_VARS.JWT_SECRET_KEY,
      { subject: user.email, expiresIn: '2m' },
    );
  };

  static isTokenValid(token: string): [boolean, JwtPayload | null] {
    try {
      return [true, jwt.verify(token, CLEAN_VARS.JWT_SECRET_KEY) as JwtPayload];
    } catch (e) {
      log.warn('isTokenValid', e);
      return [false, null];
    }
  }

  static async #comparePassword(plainPassword: string, password: string) {
    return await bcrypt.compare(plainPassword, password);
  }
}

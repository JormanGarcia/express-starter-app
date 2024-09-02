import * as bcrypt from 'bcrypt';
import { UserAuthoritiesRepository, UserRepository } from '@/repositories/user.repository';
import { ResourceNotFoundException } from '@/utils/exceptions';

export abstract class UserService {
  static async getUserByEmail(email: string) {
    const user = await UserRepository.findOne({ where: { email }, relations: ['_authorities'] });

    if (!user) throw new ResourceNotFoundException();

    return user;
  }

  static async createUser(newUser: { email: string; password: string }) {
    const ADMIN_PERMISSIONS = await UserAuthoritiesRepository.findBy({
      role: 'ADMIN',
    });
    const user = await UserRepository.create({
      email: newUser.email,
      password: await this.#encryptPassword(newUser.password),
      _authorities: [...ADMIN_PERMISSIONS],
    });

    return await UserRepository.save(user);
  }

  static async #encryptPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(plainPassword, salt);
    return encryptedPassword;
  }
}

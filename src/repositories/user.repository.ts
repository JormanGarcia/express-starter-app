import { User, UserPermissions } from '@/models/user.model';
import { DatabaseClient } from '@/database';

export const UserRepository = DatabaseClient.getRepository(User);
export const UserAuthoritiesRepository = DatabaseClient.getRepository(UserPermissions);

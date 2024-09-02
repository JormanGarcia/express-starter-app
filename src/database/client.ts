import { DataSource } from 'typeorm';
import { User, UserPermissions } from '@/models';
import { CLEAN_VARS } from '@/utils/constants';
import { log } from '@/utils/logger.utils';

export const DatabaseClient = new DataSource({
  type: 'postgres',
  host: CLEAN_VARS.DATABASE_HOST,
  port: CLEAN_VARS.DATABASE_PORT,
  username: CLEAN_VARS.DATABASE_USERNAME,
  password: CLEAN_VARS.DATABASE_PASSWORD,
  database: CLEAN_VARS.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, UserPermissions],
  subscribers: [],
  migrations: [],
});

export function initDatabase() {
  log.info('database', 'starting database');
  DatabaseClient.initialize()
    .then(() => {
      log.info('database', 'database running successfully!');
    })
    .catch((e) => {
      log.fatal('database', 'there was an error running the database');
      log.fatal('database', e);
      process.exit();
    });
}

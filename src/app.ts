import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import { ExceptionHandler } from '@/middlewares/exceptions/exception-handler.middleware';
import { CLEAN_VARS } from '@/utils/constants';
import { initDatabase } from './database';
import { AppRouter } from './routes';
import { log } from './utils/logger.utils';

const app = express();

app.use(morgan('short'));
app.use(express.json());
app.use('/api', AppRouter());
app.use(ExceptionHandler);

app.listen(CLEAN_VARS.PORT, () => {
  log.info('server', 'listening on port: ' + CLEAN_VARS.PORT);
  initDatabase();
});

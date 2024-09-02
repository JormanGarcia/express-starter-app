import { ErrorRequestHandler } from 'express';
import { RuntimeException, SomethingWentWrong } from '@/utils/exceptions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ExceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof RuntimeException) {
    res.status(err.status).json(err.get());
    return;
  }

  res.status(500).send(new SomethingWentWrong().get());
};

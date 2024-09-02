import { RequestHandler } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validate as validateClass } from 'class-validator';
import { ForbiddenRequest } from '@/utils/exceptions';

type ValidateUtility = (dto: ClassConstructor<object>) => RequestHandler;

export const validate: ValidateUtility = (dto) => async (req, _, next) => {
  const validation = await validateClass(plainToInstance(dto, req.body));
  const contraints = getContraints(validation);

  if (contraints.length > 0) {
    throw new ForbiddenRequest(contraints);
  }

  next();
};

const getContraints = (validation: ValidationError[]) => {
  return validation.map((item) => Object.entries(item.constraints as object)[0][1]);
};

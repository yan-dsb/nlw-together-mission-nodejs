import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne(user_id);

  if (!user) {
    throw new AppError('Unauthorized', 401);
  }

  if (!user.isAdmin) {
    throw new AppError('Unauthorized', 401);
  }
  return next();
}

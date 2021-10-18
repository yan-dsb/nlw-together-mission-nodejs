import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const admin = true;

  if (!admin) {
    throw new AppError('Unauthorized', 401);
  }
  return next();
}

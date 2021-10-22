import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

interface ITokenPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      '8c3056813d68ec772fd0dbab2916f0b1'
    ) as ITokenPayload;

    request.user_id = sub;
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}

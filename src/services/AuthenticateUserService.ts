import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    if (!email) {
      throw new AppError('E-mail incorrect');
    }
    if (!password) {
      throw new AppError('Password incorrect');
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('Invalid credentials');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError('Invalid credentials');
    }

    const token = sign(
      { email: user.email },
      '8c3056813d68ec772fd0dbab2916f0b1',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return token;
  }
}

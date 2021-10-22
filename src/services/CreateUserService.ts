import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export default class CreateUserService {
  async execute({ name, email, password, isAdmin = false }: IUserRequest) {
    if (!email) {
      throw new AppError('E-mail incorrect');
    }
    if (!password) {
      throw new AppError('Password incorrect');
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      isAdmin
    });

    await usersRepository.save(user);
    return classToClass(user);
  }
}

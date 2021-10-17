import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export default class CreateUserService {
  async execute({ name, email, isAdmin }: IUserRequest) {
    if (!email) {
      throw new AppError('E-mail incorrect');
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({ name, email, isAdmin });

    await usersRepository.save(user);
    return user;
  }
}

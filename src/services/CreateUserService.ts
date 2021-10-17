import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export default class CreateUserService {
  async execute({ name, email, isAdmin }: IUserRequest) {
    if (!email) {
      throw new Error('E-mail incorrect');
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = usersRepository.create({ name, email, isAdmin });

    await usersRepository.save(user);
    return user;
  }
}

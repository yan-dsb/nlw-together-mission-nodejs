import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

export default class ListUsersService {
  async handle() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return classToClass(users);
  }
}

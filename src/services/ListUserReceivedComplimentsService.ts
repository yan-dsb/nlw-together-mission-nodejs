import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import ComplimentsRepository from '../repositories/ComplimentsRepository';

export default class ListUserReceivedComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
      },
      relations: ['userSender', 'userReceiver', 'tag']
    });

    return classToClass(compliments);
  }
}

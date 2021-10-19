import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import ComplimentsRepository from '../repositories/ComplimentsRepository';
import UsersRepository from '../repositories/UsersRepository';

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export default class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message
  }: IComplimentRequest) {
    if (user_sender === user_receiver) {
      throw new AppError('You cannot compliment yourself');
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new AppError('User receiver not found');
    }

    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const complimentAlreadyExists = await complimentsRepository.findOne({
      tag_id,
      user_sender,
      user_receiver
    });

    if (complimentAlreadyExists) {
      throw new AppError('Compliment with this tag already exists');
    }

    const comliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsRepository.save(comliment);
    return comliment;
  }
}

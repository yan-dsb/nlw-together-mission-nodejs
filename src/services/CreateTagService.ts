import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TagsRepository from '../repositories/TagsRepository';

interface IRequestTag {
  name: string;
}

export default class CreateTagService {
  async execute({ name }: IRequestTag) {
    if (!name) {
      throw new AppError('Tag name incorrect');
    }

    const tagsRepository = getCustomRepository(TagsRepository);

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new AppError('Tag name already exists');
    }

    const tag = tagsRepository.create({ name });

    await tagsRepository.save(tag);

    return tag;
  }
}

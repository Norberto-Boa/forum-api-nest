import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { right, type Either } from '@/core/either';
import { Injectable } from '@nestjs/common';

interface FetchRecentQuestionsServiceRequest {
  page: number;
}

type FetchRecentQuestionsServiceResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

@Injectable()
export class FetchRecentQuestionsService {
  constructor(private questionsRepository: QuestionsRepository) {}
  async execute({
    page,
  }: FetchRecentQuestionsServiceRequest): Promise<FetchRecentQuestionsServiceResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
    });

    return right({ questions });
  }
}

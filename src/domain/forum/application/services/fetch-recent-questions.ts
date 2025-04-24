import type { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { right, type Either } from '@/core/either';

interface FetchRecentQuestionsServiceRequest {
  page: number;
}

type FetchRecentQuestionsServiceResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionsService {
  constructor(private questionsRepository: QuestionRepository) {}
  async execute({
    page,
  }: FetchRecentQuestionsServiceRequest): Promise<FetchRecentQuestionsServiceResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
    });

    return right({ questions });
  }
}

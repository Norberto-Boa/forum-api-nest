import { right, type Either } from '@/core/either';
import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswersServiceRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersServiceResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchQuestionAnswersService {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersServiceRequest): Promise<FetchQuestionAnswersServiceResponse> {
    const answers = await this.answersRepository.findManyByQuestion(
      { page },
      questionId,
    );

    return right({ answers });
  }
}

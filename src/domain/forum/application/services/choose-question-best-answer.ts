import { left, right, type Either } from '@/core/either';
import type { Answer } from '../../enterprise/entities/answer';
import type { AnswersRepository } from '../repositories/answers-repository';
import type { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface ChooseBestAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

type ChooseBestAnswerServiceResponse = Either<
  ResourceNotFoundError,
  {
    answer: Answer;
  }
>;

export class ChooseBestAnswerService {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseBestAnswerServiceRequest): Promise<ChooseBestAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(answerId.toString());

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toValue(),
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}

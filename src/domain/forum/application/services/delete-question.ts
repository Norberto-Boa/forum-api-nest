import { left, right, type Either } from '@/core/either';
import type { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteQuestionServiceRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteQuestionService {
  constructor(private QuestionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionServiceRequest): Promise<DeleteQuestionServiceResponse> {
    const question = await this.QuestionsRepository.findById(
      questionId.toString(),
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.QuestionsRepository.delete(question);

    return right(null);
  }
}

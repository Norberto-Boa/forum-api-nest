import { left, right, type Either } from '@/core/either';
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteCommentOnAnswerServiceRequest {
  authorId: string;
  commentId: string;
}

type DeleteCommentOnAnswerServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteCommentOnAnswerService {
  constructor(private answerRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    commentId,
  }: DeleteCommentOnAnswerServiceRequest): Promise<DeleteCommentOnAnswerServiceResponse> {
    const comment = await this.answerRepository.findById(commentId);

    if (!comment) {
      return left(new ResourceNotFoundError());
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(comment);

    return right(null);
  }
}

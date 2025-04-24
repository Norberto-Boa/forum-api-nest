import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionRepository } from '../repositories/questions-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { left, right, type Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface CommentOnQuestionServiceRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionServiceResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionServiceRequest): Promise<CommentOnQuestionServiceResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId),
    });

    await this.questionCommentRepository.create(questionComment);

    return right({ questionComment });
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { right, type Either } from '@/core/either';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';

interface AnswerQuestionServiceRequest {
  questionId: string;
  content: string;
  authorId: string;
  attachmentsIds: string[];
}

type AnswerQuestionServiceResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionService {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    questionId,
    content,
    authorId,
    attachmentsIds,
  }: AnswerQuestionServiceRequest): Promise<AnswerQuestionServiceResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}

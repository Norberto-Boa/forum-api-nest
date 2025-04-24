import { left, right, type Either } from '@/core/either';
import type { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface UpdateQuestionServiceRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type UpdateQuestionServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class UpdateQuestionService {
  constructor(
    private QuestionsRepository: QuestionsRepository,
    private QuestionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: UpdateQuestionServiceRequest): Promise<UpdateQuestionServiceResponse> {
    const question = await this.QuestionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.QuestionAttachmentsRepository.findManyByQuestionId(questionId);
    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    );

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentList;

    await this.QuestionsRepository.save(question);

    return right(null);
  }
}

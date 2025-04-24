import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerAttachmentRepository } from '../../src/domain/forum/application/repositories/answer-attachments-repository';
import { DomainEvents } from '@/core/events/domain-events';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(private answerAttachmentRepository: AnswerAttachmentRepository) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items[answerIndex] = answer;

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(answerIndex, 1);
    this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async findManyByQuestion(
    params: PaginationParams,
    questionId: string,
  ): Promise<Answer[]> {
    const answers = await this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 20, params.page * 20);

    return answers;
  }
}

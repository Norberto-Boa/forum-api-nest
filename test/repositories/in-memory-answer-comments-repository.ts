import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const item = await this.items.find((item) => item.id.toValue() === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async delete(comment: AnswerComment): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === comment.id.toString(),
    );

    this.items.splice(itemIndex, 1);
  }

  async fetchManyRecent(params: PaginationParams, answerId: string) {
    const items = await this.items
      .filter((item) => item.answerId.toString() === answerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 20, params.page * 20);

    return items;
  }
}

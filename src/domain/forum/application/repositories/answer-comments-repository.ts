import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
  create(answer: AnswerComment): Promise<void>;
  findById(id: string): Promise<AnswerComment | null>;
  delete(comment: AnswerComment): Promise<void>;
  fetchManyRecent(
    params: PaginationParams,
    answerId: string,
  ): Promise<AnswerComment[]>;
}

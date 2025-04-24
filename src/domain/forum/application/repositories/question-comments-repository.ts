import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(comment: QuestionComment): Promise<void>;
  findManyRecent(
    params: PaginationParams,
    questionId: string,
  ): Promise<QuestionComment[]>;
}

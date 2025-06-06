import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { Answer } from '@/domain/forum/enterprise/entities/answer';

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestion(
    params: PaginationParams,
    questionId: string,
  ): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
}

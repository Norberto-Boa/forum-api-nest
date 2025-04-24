import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
}

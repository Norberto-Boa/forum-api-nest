import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  create(answer: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.');
  }

  delete(comment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  fetchManyRecent(
    params: PaginationParams,
    answerId: string,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.');
  }
}

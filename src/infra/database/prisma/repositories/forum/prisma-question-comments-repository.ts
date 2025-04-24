import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  create(question: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.');
  }

  delete(comment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findManyRecent(
    params: PaginationParams,
    questionId: string,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.');
  }
}

import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.');
  }

  findManyByQuestion(
    params: PaginationParams,
    questionId: string,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.');
  }

  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import type { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { right, type Either } from '@/core/either';

interface GetQuestionBySlugServiceRequest {
  slug: string;
}

type GetQuestionBySlugServiceResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class GetQuestionBySlugService {
  constructor(private answersRepository: QuestionRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugServiceRequest): Promise<GetQuestionBySlugServiceResponse> {
    const question = await this.answersRepository.findBySlug(slug);

    if (!question) {
      throw new Error('Question not found');
    }

    return right({ question });
  }
}

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugService } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugService;

describe('GetQuestionBySlugService', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new GetQuestionBySlugService(inMemoryQuestionsRepository);
  });

  it('should be able to create a new Question', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: 'example-question',
    });

    expect(result.value?.question.title).toEqual(newQuestion.title);
  });
});

import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { FetchQuestionCommentsService } from './fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsService;

describe('FetchRecentQuestions', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsService(inMemoryQuestionCommentsRepository);
  });

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 18),
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 20),
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 20),
        questionId: new UniqueEntityID('question-2'),
      }),
    );

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    });

    expect(result.value?.questionsComments).toHaveLength(2);
    expect(result.value?.questionsComments).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });
  it('should be able to fetch recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-1',
    });

    expect(result.value?.questionsComments).toHaveLength(2);
  });
});

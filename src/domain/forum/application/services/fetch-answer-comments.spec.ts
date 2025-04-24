import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchAnswerCommentsService } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsService;

describe('FetchRecentAnswers', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsService(inMemoryAnswerCommentsRepository);
  });

  it('should be able to fetch recent answers', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        createdAt: new Date(2022, 0, 18),
        answerId: new UniqueEntityID('answer-1'),
      }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        createdAt: new Date(2022, 0, 20),
        answerId: new UniqueEntityID('answer-1'),
      }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        createdAt: new Date(2022, 0, 20),
        answerId: new UniqueEntityID('answer-2'),
      }),
    );

    const result = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.answersComments).toHaveLength(2);
    expect(result.value?.answersComments).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });
  it('should be able to fetch recent answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      );
    }

    const result = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    });

    expect(result.value?.answersComments).toHaveLength(2);
  });
});

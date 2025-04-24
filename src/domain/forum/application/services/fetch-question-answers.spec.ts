import { makeAnswer } from 'test/factories/make-answer';
import { FetchQuestionAnswersService } from './fetch-question-answers';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionAnswersService;

describe('FetchQuestionAnswersQuestions', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new FetchQuestionAnswersService(inMemoryAnswersRepository);
  });

  it('should be able to fetch recent questions', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    });

    expect(result.value?.answers).toHaveLength(3);
    // expect(questions).toEqual([
    //   expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
    //   expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
    //   expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    // ]);
  });
  it('should be able to fetch recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-1',
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});

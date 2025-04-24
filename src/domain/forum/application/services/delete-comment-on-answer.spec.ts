import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteCommentOnAnswerService } from './delete-comment-on-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteCommentOnAnswerService;

describe('DeleteCommentOnAnswerService', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteCommentOnAnswerService(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete Answer', async () => {
    const newComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(newComment);

    await sut.execute({
      authorId: newComment.authorId.toString(),
      commentId: newComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should be not be able to delete Answer with different authorId', async () => {
    const newComment = makeAnswerComment({
      authorId: new UniqueEntityID('1'),
    });

    await inMemoryAnswerCommentsRepository.create(newComment);

    const result = await sut.execute({
      authorId: '2',
      commentId: newComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1);
  });
});

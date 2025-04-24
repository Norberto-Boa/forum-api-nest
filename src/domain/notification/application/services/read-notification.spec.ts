import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { ReadNotificationService } from './read-notification';
import { makeNotification } from 'test/factories/make-notification';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationService;

describe('Read Notification Service', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationService(inMemoryNotificationsRepository);
  });

  it('should read a notification', async () => {
    const newNotification = makeNotification();
    await inMemoryNotificationsRepository.create(newNotification);

    const result = await sut.execute({
      notificationId: newNotification.id.toString(),
      recipientId: newNotification.recipientId.toValue(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not read a notification from another user', async () => {
    const newNotification = makeNotification({
      recipientId: new UniqueEntityID('1'),
    });
    await inMemoryNotificationsRepository.create(newNotification);

    const result = await sut.execute({
      notificationId: newNotification.id.toString(),
      recipientId: '2',
    });

    expect(result.isRight()).toBeFalsy();
    expect(inMemoryNotificationsRepository.items[0].readAt).toBeFalsy();
  });

  it('should not read a notification that does not exist', async () => {
    const result = await sut.execute({
      notificationId: '1',
      recipientId: '2',
    });

    expect(result.isRight()).toBeFalsy();
  });
});

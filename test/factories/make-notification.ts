import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Notification,
  type NotificationProps,
} from '@/domain/notification/enterprise/entities/notification';
import { faker } from '@faker-js/faker';

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
): Notification {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.words(3),
      content: faker.lorem.words(5),
      ...override,
    },
    id,
  );

  return notification;
}

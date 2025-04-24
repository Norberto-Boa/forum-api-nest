import { left, right, type Either } from '@/core/either';
import type { Notification } from '../../enterprise/entities/notification';
import type { NotificationsRepository } from '../repositories/notifications-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface ReadNotificationServiceRequest {
  notificationId: string;
  recipientId: string;
}

type ReadNotificationServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationService {
  constructor(private notificationsRepositoru: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationServiceRequest): Promise<ReadNotificationServiceResponse> {
    const notification =
      await this.notificationsRepositoru.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId.toValue() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepositoru.save(notification);

    return right({
      notification,
    });
  }
}

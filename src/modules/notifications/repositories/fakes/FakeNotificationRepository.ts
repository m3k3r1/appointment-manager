import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import { ObjectID } from 'mongodb';

export default class NotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  async create({
    content,
    user_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, {
      id: new ObjectID(),
      content,
      user_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

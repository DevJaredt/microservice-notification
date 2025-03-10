import { IMail } from "../../domain/interfaces/IMail";
import { INotificationRepository } from "../../domain/interfaces/INotificationRepository";
import { NotificationModel } from "../database/models/NotificationSchema";

export class MongoNotificationRepository implements INotificationRepository {
  async save(notification: IMail): Promise<void> {
    try {
      if (!notification.to || !notification.body) {
      }

      await NotificationModel.create({
        userId: notification.to,
        message: notification.body,
        status: "pending",
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("error notification saved", error);
    }
  }

  async findByUserId(userId: string): Promise<void> {
    await NotificationModel.find({ userId }).exec();
  }
}

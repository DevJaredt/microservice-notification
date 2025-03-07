import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { Notification } from "../../domain/entities/Notification";

import { IMail } from "../../domain/interfaces/IMail";
import { NotificationModel } from "../database/models/NotificationModel";

export class MongoNotificationRepository implements NotificationRepository {
  async save(notification: IMail): Promise<void> {
    try{
      if(!notification.to || !notification.body)  {

      }
      await NotificationModel.create({
        userId:  notification.to,
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

  async markAsRead(id: string): Promise<void> {
    await NotificationModel.findByIdAndUpdate(id, { status: "read" }).exec();
  }
}

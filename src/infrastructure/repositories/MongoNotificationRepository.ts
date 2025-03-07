import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { Notification } from "../../domain/entities/Notification";
import { NotificationModel } from "../database/Models/NotificationModel";
import { IMail } from "../../domain/interfaces/IMail";


export class MongoNotificationRepository implements NotificationRepository {
  async save(notification: IMail): Promise<void> {
    await NotificationModel.create(notification);
  }

  async findByUserId(userId: string): Promise<void> {
    await NotificationModel.find({ userId }).exec();
  }

  async markAsRead(id: string): Promise<void> {
    await NotificationModel.findByIdAndUpdate(id, { status: "read" }).exec();
  }
}

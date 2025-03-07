import { IMail } from "../interfaces/IMail";

export interface NotificationRepository {
  save(notification: IMail): Promise<void>;
  findByUserId(userId: string): Promise<void>;
  markAsRead(id: string): Promise<void>;
}

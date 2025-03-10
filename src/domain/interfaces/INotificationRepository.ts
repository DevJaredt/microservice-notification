import { IMail } from "./IMail";

export interface INotificationRepository {
  save(notification: IMail): Promise<void>;
  findByUserId(userId: string): Promise<void>;
}

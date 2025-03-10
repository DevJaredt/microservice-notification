import { NOTIFICATION_TYPE } from "../enums/NotificationType";
import { IMail } from "./IMail";

export interface INotificationUseCase {
  execute(type: NOTIFICATION_TYPE, notificationData: IMail): Promise<void>;
}

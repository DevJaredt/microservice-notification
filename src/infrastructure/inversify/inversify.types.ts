

export const TYPES = {
  //Express
  ExpressApp: Symbol.for("ExpressApp"),
  RouterManager: Symbol.for("RouterManager"),
  NotificationRouter: Symbol.for("NotificationRouter"),

  //Notification
  MongoNotificationRepository: Symbol.for("MongoNotificationRepository"),
  NotificationService: Symbol.for("NotificationService"),
  SendNotificationUseCase: Symbol.for("SendNotificationUseCase"),
  UserNotificationRouter: Symbol.for("UserNotificationRouter"),
  AccountNotificationRouter: Symbol.for("AccountNotificationRouter"),

  //Queues
  QueueService: Symbol.for("QueueNotificationUseCase"),
};

import { Container } from "inversify";

import { TYPES } from "./inversify.types";
import { ExpressApp } from "../express/express";
import { IServer } from "../../domain/interfaces/IServer";
import { IRouterManager } from "../../domain/interfaces/IRouterManager";
import { RouterManager } from "../express/routes/RouterManager";
import { Router } from "express";
import { NotificationRouter } from "../express/routes/notification/NotificationRouter";
import { INotificationRepository } from "../../domain/interfaces/INotificationRepository";
import { INotificationService } from "../../domain/interfaces/INotificationService";
import { INotificationUseCase } from "../../domain/interfaces/INotificationUseCase";
import { MongoNotificationRepository } from "../repositories/MongoNotificationRepository";
import { NotificationService } from "../services/NotificationService";
import { SendNotificationUseCase } from "../../application/use-cases/SendNotificationUseCase";
import { IQueueService } from "../../domain/interfaces/IQueueService";
import { QueueService } from "../services/QueueService";
import { IRouterModule } from "../../domain/interfaces/IRouterModule";
import { UserNotificationRouter } from "../express/routes/user/UserNotification";
import { AccountNotificationRouter } from "../express/routes/account/AccountNotification";

const container = new Container();

//Express
container.bind<IServer>(TYPES.ExpressApp).to(ExpressApp);
container.bind<IRouterManager<Router>>(TYPES.RouterManager).to(RouterManager);
container.bind(TYPES.NotificationRouter).to(NotificationRouter);

//Notification
container
  .bind<INotificationRepository>(TYPES.MongoNotificationRepository)
  .to(MongoNotificationRepository);
container
  .bind<INotificationService>(TYPES.NotificationService)
  .to(NotificationService);
container
  .bind<INotificationUseCase>(TYPES.SendNotificationUseCase)
  .toDynamicValue((context) => {
    const notificationRepository = container.get<INotificationRepository>(
      TYPES.MongoNotificationRepository
    );
    const notificationService = container.get<INotificationService>(
      TYPES.NotificationService
    );
    const queueService = container.get<IQueueService>(TYPES.QueueService);
    TYPES.QueueService

    return new SendNotificationUseCase(
      notificationRepository,
      notificationService,
      queueService
    );
  });
container
  .bind<IRouterModule<Router>>(TYPES.UserNotificationRouter)
  .to(UserNotificationRouter);

container
  .bind<IRouterModule<Router>>(TYPES.AccountNotificationRouter)
  .to(AccountNotificationRouter);
container.bind<IQueueService>(TYPES.QueueService).to(QueueService);

export { container };

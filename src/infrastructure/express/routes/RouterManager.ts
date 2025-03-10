import { Application, Router } from "express";
import { IRouterModule } from "../../../domain/interfaces/IRouterModule";
import { IRouterManager } from "../../../domain/interfaces/IRouterManager";
import { inject, injectable } from "inversify";
import { TYPES } from "../../inversify/inversify.types";

@injectable()
export class RouterManager implements IRouterManager<Application> {
  constructor(
    @inject(TYPES.NotificationRouter)
    private readonly notificationRouter: IRouterModule<Router>,
    @inject(TYPES.UserNotificationRouter)
    private readonly userNotificationRouter: IRouterModule<Router>,
    @inject(TYPES.AccountNotificationRouter)
    private readonly accountNotificationRouter: IRouterModule<Router>
  ) {}

  manageRoutes(app: Application): void {
    app.use("/api/notification", this.notificationRouter.getRouter());
    app.use("/api/notification", this.userNotificationRouter.getRouter());
    app.use("/api/notification", this.accountNotificationRouter.getRouter());
  }
}

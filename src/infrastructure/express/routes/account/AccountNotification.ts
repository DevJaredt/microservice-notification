import { Request, Response, Router } from "express";
import { IRouterModule } from "../../../../domain/interfaces/IRouterModule";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../inversify/inversify.types";
import { INotificationUseCase } from "../../../../domain/interfaces/INotificationUseCase";
import { NOTIFICATION_TYPE } from "../../../../domain/enums/NotificationType";
import { LogsService } from "../../../http/logs.services";

@injectable()
export class AccountNotificationRouter implements IRouterModule<Router> {
  private router: Router;

  constructor(
    @inject(TYPES.SendNotificationUseCase)
    private readonly sendNotificationUseCase: INotificationUseCase
  ) {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    //account
    this.router.post(
      "/send/account/send-money",
      async (req: Request, res: Response) => {
        try {
          await this.sendNotificationUseCase.execute(
            NOTIFICATION_TYPE.ACCOUNT_SEND_MONEY,
            req.body
          );
          res.status(200).json({ message: "Email send with success!" });
        } catch (error) {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    );
    this.router.patch(
      "/send/account/get-money",
      async (req: Request, res: Response) => {
        try {
          await this.sendNotificationUseCase.execute(
            NOTIFICATION_TYPE.ACCOUNT_GET_MONEY,
            req.body
          );
          res.status(200).json({ message: "Email send with success!" });
        } catch (error) {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    );

    this.router.patch(
      "/send/account/transfer-money",
      async (req: Request, res: Response) => {
        try {
          await this.sendNotificationUseCase.execute(
            NOTIFICATION_TYPE.ACCOUNT_ADD_FOUNDS,
            req.body
          );
          res.status(200).json({ message: "Email send with success!" });
        } catch (error) {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

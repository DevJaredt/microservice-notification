import { Request, Response, Router } from "express";
import { INotificationUseCase } from "../../../../domain/interfaces/INotificationUseCase";
import { inject, injectable } from "inversify";
import { IRouterModule } from "../../../../domain/interfaces/IRouterModule";
import { TYPES } from "../../../inversify/inversify.types";

@injectable()
export class NotificationRouter implements IRouterModule<Router> {
  private router: Router;

  constructor(
    @inject(TYPES.SendNotificationUseCase)
    private readonly sendNotificationUseCase: INotificationUseCase  
  ) {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    //Send
    this.router.post("/send", async (req: Request, res: Response) => {
      try {
        // await this.sendNotificationUseCase.execute(req.body);


        res.status(200).json({ message: "Email send with success!" });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }

  getRouter(): Router {
    return this.router;
  }
}

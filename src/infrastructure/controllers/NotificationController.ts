import { inject, injectable } from "inversify";
import { SendNotificationUseCase } from "../../application/use-cases/SendNotificationUseCase";
import express, { Request, Response } from "express";

@injectable()
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase
  ) {}
  async send(req: Request, res: Response) {
    try {
      await this.sendNotificationUseCase.execute(req.body);
      res.status(201).json({ message: "Notification send" });
    } catch (error) {
      res.status(500).json({ error: "Error al enviar la notificacion" });
    }
  }
}

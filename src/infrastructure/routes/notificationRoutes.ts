import { Router } from "express";
import { SendNotificationUseCase } from "../../application/use-cases/SendNotificationUseCase";
import { NotificationController } from "../controllers/NotificationController";

const router = Router();
const sendNotificationUseCase = new SendNotificationUseCase();
const notificacionController = new NotificationController(
  sendNotificationUseCase
);

router.post("/notifications", (req, res) =>
  notificacionController.send(req, res)
);

export default router; 

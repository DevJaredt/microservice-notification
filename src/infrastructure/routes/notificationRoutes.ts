import { Router } from "express";
import { container } from "../container";
import { SendNotificationUseCase } from "../../application/use-cases/SendNotificationUseCase";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NodemailerService } from "../../application/services/NodemailerService";
import Redis from "ioredis";

const router = Router();
const mailService = new NodemailerService();
const redis = new Redis();

router.post("/notifications", async (req, res) => {
  try {
    const sendNotificationUseCase = container.get<SendNotificationUseCase>(
      "SendNotificationUseCase"
    );
    await sendNotificationUseCase.execute(req.body as any);
    res.status(201).json({ message: "Notificacion enviada y guardada" });
  } catch (error) {
    console.error("error enviando notificacion", error);
    res.status(500).json({ message: "Error al enviar la notificacion" });
  }
});

router.get("/notifications/:userId", async (req, res) => {
  try {
    const notificationRepository = container.get<NotificationRepository>(
      "NotificationRepository"
    );
    const notifications = await notificationRepository.findByUserId(
      req.params.userId
    );
    res.json(notifications);
  } catch (error) {
    console.error("error obteniendo notificaciones", error);
    res.status(500).json({ message: "Error al obtebe la notificacion" });
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, body, notificationId } = req.body;

    if (!to || !subject || !body) {
      res.status(400).json({ error: "Faltan datos en la solicitud" });
    }
    const notificationData = {
      status: "pending",
      to,
      subject,
      body,
    };

    await redis.set(notificationId, JSON.stringify(notificationData));
    await mailService.sendMail(to, subject, body);
    const updateNotificationData = { ...notificationData, status: "send" };
    await redis.set(notificationId, JSON.stringify(updateNotificationData));
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    const notificationData = {
      status: error,
    };
    res.status(500).json({ error: "Error enviando correo" });
  }
});

router.post("/notification-status/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notificationData = await redis.get(notificationId);
    if (!notificationData) {
      res.status(404).json({ error: "Notification not found" });
    }
    const notification = JSON.stringify(notificationData);
    res.status(200).json({ notification });
  } catch (error) {
    console.error("Error al obtener el estado de la notificación:", error);
    res
      .status(500)
      .json({ error: "Error al obtener el estado de la notificación" });
  }
});
export default router;

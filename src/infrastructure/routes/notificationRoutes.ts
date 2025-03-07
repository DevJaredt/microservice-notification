import { Router } from "express";
import { container } from "../container";
import { SendNotificationUseCase } from "../../application/use-cases/SendNotificationUseCase";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NodemailerService } from "../../application/services/NodemailerService";

const router = Router();
const mailService = new NodemailerService();

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

router.post('/send-email', async (req, res) => {
  try {
    const {to, subject, body} = req.body;

    if(!to || !subject || !body) {
      res.status(400).json({ error: "Faltan datos en la solicitud" });
    }
    await mailService.sendMail(to, subject, body)
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ error: "Error enviando correo" });
  }
})
export default router;

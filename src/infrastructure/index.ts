import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb://jared:jared123@localhost:27017/notifications?authsource=admin"
  )
  .then(() => console.log("🚀 Connect to MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

const NotificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Notification = mongoose.model("Notification", NotificationSchema);

app.post("/notifications", async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Error al  guardar la notificacion" });
  }
});

app.listen(3000, () => console.log("servidor en  localhost:3000"));

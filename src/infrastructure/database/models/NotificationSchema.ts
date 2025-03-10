import mongoose from "mongoose";
import { NotificationStatus } from "../../../domain/enums/NotificationStatus";

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: NotificationStatus,  
    default: NotificationStatus.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema  
);

import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["sent", "pending", "read"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema  
);

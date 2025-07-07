import express from "express";
import {
  getNotifications,
  handleCreateNotification,
  markNotificationAsRead,
} from "../controllers/notificationController";

const router = express.Router();

router.get("/:userId", getNotifications);

router.post("/", handleCreateNotification);

router.put("/:id/read", markNotificationAsRead);

export default router;

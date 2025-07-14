import express, { RequestHandler } from "express";
import {
  getNotifications,
  handleCreateNotification,
  markNotificationAsRead,
} from "../controllers/notificationController";

const router = express.Router();

router.get("/:userId", getNotifications as RequestHandler);
router.post("/", handleCreateNotification as RequestHandler);
router.put("/:id/read", markNotificationAsRead as RequestHandler);

export default router;

import express, { RequestHandler } from "express";
import {
  getNotifications,
  handleCreateNotification,
  markNotificationAsRead,
} from "../controllers/notificationController";
import NotificationModel from "../models/Notification";


const router = express.Router();

router.get("/:userId", getNotifications as RequestHandler);
router.post("/", handleCreateNotification as RequestHandler);
router.put("/:id/read", markNotificationAsRead as RequestHandler);

router.get("/notifications/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
});

export default router;

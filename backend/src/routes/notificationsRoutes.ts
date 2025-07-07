import express from "express";
import {
  getNotifications,
  handleCreateNotification,
  markNotificationAsRead,
} from "../controllers/notificationController";

const router = express.Router();

// GET /notifications/:userId → Pega todas as notificações de um usuário
router.get("/:userId", getNotifications);

// POST /notifications → Cria uma nova notificação
router.post("/", handleCreateNotification);

// PUT /notifications/:id/read → Marca uma notificação como lida
router.put("/:id/read", markNotificationAsRead);

export default router;

import { Request, Response } from "express";
import * as NotificationService from "../services/notificationService";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const notifications = await NotificationService.getNotificationsByUser(userId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
};

export const handleCreateNotification = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const newNotification = await NotificationService.createNotification(userId, message);
    res.status(201).json(newNotification);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await NotificationService.markNotificationAsRead(id);

    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }

    res.status(200).json({ message: "Notificação marcada como lida" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar notificação" });
  }
};

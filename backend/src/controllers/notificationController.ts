import { Request, Response } from "express";
import NotificationModel from "../models/Notification";


export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
};


export const createNotification = async (
  userId: string,
  message: string
) => {
  const newNotification = await NotificationModel.create({
    userId,
    message,
    read: false,
  });

  return newNotification;
};

export const markNotificationAsRead = async (req: Request, res: Response): Promise<any> => {
  try {
    const notificationId = req.params.id;
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }

    (notification as any).read = true;
    await notification.save();

    return res.status(200).json({ message: "Notificação marcada como lida" });
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const handleCreateNotification = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const nova = await createNotification(userId, message); 
    return res.status(201).json(nova);
  } catch (error: any) {
    console.error("Erro ao criar notificação:", error);
    return res.status(500).json({ error: error.message });
  }
};


import NotificationModel, { Notification } from "../models/Notification";

export class NotificationService {
  /**
   * Cria uma nova notificação
   */
  async createNotification(userId: string, message: string): Promise<Notification> {
    const newNotification = new NotificationModel({
      userId,
      message,
    });

    return await newNotification.save();
  }

  /**
   * Retorna todas as notificações de um usuário
   */
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await NotificationModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  /**
   * Marca uma notificação como lida
   */
  async markAsRead(notificationId: string): Promise<Notification | null> {
    return await NotificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    ).exec();
  }
}

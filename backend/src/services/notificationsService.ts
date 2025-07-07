import NotificationModel, { Notification } from "../models/Notification";

export class NotificationService {

  async createNotification(userId: string, message: string): Promise<Notification> {
    const newNotification = new NotificationModel({
      userId,
      message,
    });

    return await newNotification.save();
  }


  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await NotificationModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(notificationId: string): Promise<Notification | null> {
    return await NotificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    ).exec();
  }
}

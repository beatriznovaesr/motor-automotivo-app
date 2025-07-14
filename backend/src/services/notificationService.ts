import NotificationModel from "../models/Notification";

export const getNotificationsByUser = async (userId: string) => {
  return await NotificationModel.find({ userId }).sort({ createdAt: -1 });
};

export const createNotification = async (userId: string, message: string) => {
  return await NotificationModel.create({
    userId,
    message,
    read: false,
  });
};

export const markNotificationAsRead = async (notificationId: string) => {
  const notification = await NotificationModel.findById(notificationId);
  if (!notification) return null;

  notification.read = true;
  await notification.save();
  return notification;
};
